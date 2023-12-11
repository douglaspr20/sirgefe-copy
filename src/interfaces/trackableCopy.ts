import { EditorProps } from 'react-draft-wysiwyg';

export type FieldTrackabelCopySortType =
  | 'created'
  | 'purchases'
  | 'clicks'
  | 'revenue'
  | 'name';

export interface ExtendedEditorProps extends EditorProps {
  onCut?: (x: any, e: any) => void;
}
