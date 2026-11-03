import React, { useEffect, useState } from 'react';
import { Clock3, History, Loader2, UserRound } from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { FileVersion, FileNode } from '@/types/editor';
import { formatDistanceToNow } from '@/lib/time';
import { cn } from '@/lib/utils';

interface FileHistoryPanelProps {
  className?: string;
  projectId: string;
  file: FileNode | null;
  refreshKey?: string | number | null;
}

interface FileHistoryResponse {
  file: { id: string };
  versions: FileVersion[];
}

export const FileHistoryPanel: React.FC<FileHistoryPanelProps> = ({
  className, projectId, file, refreshKey,
}) => {
  const [versions, setVersions] = useState<FileVersion[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    const fetchHistory = async () => {
      if (!projectId || !file?.id || file.type !== 'file') {
        setVersions([]);
        return;
      }
      setLoading(true);
      try {
        const response = await apiRequest<FileHistoryResponse>(
          `/projects/${projectId}/files/${file.id}/history?limit=6`
        );
        if (active) setVersions(response.versions || []);
      } catch {
        if (active) setVersions([]);
      } finally {
        if (active) setLoading(false);
      }
    };
    void fetchHistory();
    return () => { active = false; };
  }, [projectId, file?.id, file?.type, refreshKey]);

  return (
    <div className={cn('flex min-h-0 flex-1 flex-col', className)}>
      <div className="panel-header">
        <span>Recent changes</span>
        {file?.type === 'file' && (
          <span className="text-[10px] font-normal normal-case tracking-normal text-muted-foreground">
            {versions.length} saved
          </span>
        )}
      </div>
      {!file || file.type !== 'file' ? (
        <div className="px-4 py-5 text-sm text-muted-foreground">Select a file to view its recent saves.</div>
      ) : loading ? (
        <div className="flex items-center gap-2 px-4 py-5 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading changes…
        </div>
      ) : versions.length === 0 ? (
        <div className="px-4 py-5 text-sm text-muted-foreground">No saved changes yet.</div>
      ) : (
        <div className="min-h-0 flex-1 overflow-auto">
          {versions.map((version) => (
            <div key={version.id} className="border-b border-border/60 px-4 py-3 last:border-b-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <History className="h-4 w-4 text-primary" />
                  <span>Save #{version.revision}</span>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] capitalize text-muted-foreground">
                  {version.source}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5" />
                {formatDistanceToNow(new Date(version.created_at), { addSuffix: true })}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                <UserRound className="h-3.5 w-3.5" />
                {version.updated_by_name || 'Unknown user'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
