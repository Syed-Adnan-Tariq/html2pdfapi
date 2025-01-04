
export function SetPdfResponse(res, buffer) {
    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=html.pdf',
        'Content-Length': buffer.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
      })
      res.end(buffer)
}