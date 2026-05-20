import { useCallback, useState } from 'react';
import { safeNotification } from '@/lib/safeHaptics';

export function usePdfExport() {
  const [exporting, setExporting] = useState(false);
  const [success, setSuccess] = useState(false);

  const exportPdf = useCallback(async () => {
    setExporting(true);
    setSuccess(false);
    await new Promise((r) => setTimeout(r, 2800));
    setExporting(false);
    setSuccess(true);
    safeNotification();
    setTimeout(() => setSuccess(false), 4000);
  }, []);

  return { exporting, success, exportPdf };
}
