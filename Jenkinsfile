/* groovylint-disable LineLength */
node {
    app = null
    properties([disableConcurrentBuilds()])
    stage('Set NodeJs') {
        env.NODEJS_HOME = "${tool 'Node-18'}"
        env.PATH="${env.NODEJS_HOME}/bin:${env.PATH}"
        sh 'npm --version'
    }
    stage('Checkout Repository') {
        cleanWs()
        checkout scm
        sh 'git rev-parse --short HEAD > .git/commit-id'
        env.COMMIT_ID = readFile('.git/commit-id').trim()
        env.PROJECT_NAME = (env.JOB_NAME.tokenize('/') as String[])[0]
        env.SONAR_KEY = (env.WORKSPACE.tokenize('/') as String[]).last()
        env.IMAGE_TAG = "synavoshub/${env.PROJECT_NAME}:${commit_id}"
        env.BUILD_TAG = "${env.PROJECT_NAME}-${commit_id}"
        env.GIT_AUTHOR = sh (script: 'git log -1 --pretty=%cn ${GIT_COMMIT}', returnStdout: true).trim()
        env.GIT_COMMIT_MSG = sh (script: 'git log -1 --pretty=%B ${GIT_COMMIT}', returnStdout: true).trim()
        postMattermostReport("started")
    }
    try{
        stage('Installing Dependencies') {
            echo 'Installing Dependencies...'
            sh 'rm -f package-lock.json && npm i'
        }
        stage('Sonar') {
            echo 'Sonar Code Analysis...'
            def sonarqubeScannerHome = tool name: 'sonar', type: 'hudson.plugins.sonar.SonarRunnerInstallation'
            withCredentials([string(credentialsId: 'sonar', variable: 'sonarLogin')]) {
               sh """${sonarqubeScannerHome}/bin/sonar-scanner -e -Dsonar.host.url=http://sonarqube:9000 -Dsonar.login=${sonarLogin} \
                -Dsonar.projectName=${env.SONAR_KEY} -Dsonar.projectVersion=${env.BUILD_TAG} -Dsonar.projectKey=${env.SONAR_KEY} \
                -Dsonar.sources=${env.WORKSPACE} -Dsonar.exclusions=**/*.test.js -Dsonar.tests=${env.WORKSPACE} -Dsonar.test.inclusions=**/*.test.js \
                -Dsonar.coverage.exclusions=**/*.boundary.* -Dsonar.cpd.exclusions=**/*.svg.js -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"""
               checkSonarStatus(currentBuild, env)
            }
        }
        stage('Snyk') {
            echo 'Snyk Reporting...'
            snykSecurity(
            snykInstallation: 'snyk',
            snykTokenId: 'snyk',
            additionalArguments: '--all-projects --detection-depth=5'
            )
        }
        stage('Create Docker Image') {
            echo 'Create Docker Image...'
            app = docker.build(env.IMAGE_TAG, '-f Dockerfile ./')
        }
        stage('Sysdig') {
            echo 'Sysdig Reporting...'
            sysdigImageScan engineCredentialsId: 'sysdig-secure-api-token-eu', imageName: "docker://${env.IMAGE_TAG}", engineURL: "https://eu1.app.sysdig.com"
        }
        if (env.BRANCH_NAME == 'develop' || env.BRANCH_NAME == 'qa' || env.BRANCH_NAME == 'staging' || env.BRANCH_NAME == 'master') {
            stage('Publish') {
                echo 'Docker Push Image...'
                docker.withRegistry('https://index.docker.io/v1/', 'synavoshub') {
                    if (env.BRANCH_NAME == 'develop') {
                        app.push('develop')
                    }
                    if (env.BRANCH_NAME == 'qa') {
                        app.push('qa')
                    }
                    if (env.BRANCH_NAME ==  'staging') {
                        app.push('staging')
                    }
                    if (env.BRANCH_NAME ==  'master') {
                        app.push('master')
                    }
                }
            }
        }
    }catch (e) {
        currentBuild.result = "FAILURE"
    }finally {
        silent_sh "docker rmi ${env.IMAGE_TAG}"
        cleanWs(cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true,
                patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                [pattern: '.propsfile', type: 'EXCLUDE']])
        if (currentBuild.result == "FAILURE") {
            postMattermostReport("failed")
        }else{
            postMattermostReport("success")
        }
    }
}

void postMattermostReport(String build_flag){
    if (build_flag == "started"){
    mattermostSend (
            color: "#2A42EE",
            message: """Build Started:
            Author: ${env.GIT_AUTHOR}
            Commit Message: ${env.GIT_COMMIT_MSG}
            Repository Name: ${env.JOB_NAME}
            Build : ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"""
            )
    }else if(build_flag == "failed"){
   mattermostSend (
            color: "#e00707",
            message: """Build Failed:
            Author: ${env.GIT_AUTHOR}
            Commit Message: ${env.GIT_COMMIT_MSG}
            Repository Name: ${env.JOB_NAME}
            Build : ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"""
            )
    }else{
   mattermostSend (
            color: "#00f514",
            message: """Build Success:
            Author: ${env.GIT_AUTHOR}
            Commit Message: ${env.GIT_COMMIT_MSG}
            Repository Name: ${env.JOB_NAME}
            Build : ${env.BUILD_NUMBER} (<${env.BUILD_URL}|Link to build>)"""
            )
    }
}

void silent_sh(String script) {
    sh("(${script}) || true")
}

String checkSonarStatus(currentBuild, env){
    sh "sleep 20"
    sh "curl -X GET -H 'Accept: application/json' http://sonarqube:9000/api/qualitygates/project_status?projectKey=${env.SONAR_KEY} > status.json"
    def json = readJSON file:'status.json'
    echo "${json.projectStatus.status}"
    if ("${json.projectStatus.status}" == "ERROR") {
        currentBuild.result = 'FAILURE'
        error('SonarQube quality gate failed, please see sonar for details.')
    }
}
