'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Bold, Italic, List, ListOrdered, Quote, Heading2, Heading3, Undo2, Redo2, Minus } from 'lucide-react';

const EDITOR_STYLES = `
.ProseMirror { min-height: 220px; padding: 16px; font-size: 15px; line-height: 1.8; color: #1f2937; outline: none; font-family: inherit; }
.ProseMirror > * + * { margin-top: 0.75em; }
.ProseMirror p { margin: 0 0 10px; }
.ProseMirror h2 { font-size: 22px; font-weight: 700; margin: 24px 0 10px; color: #0f1824; }
.ProseMirror h3 { font-size: 18px; font-weight: 600; margin: 18px 0 8px; color: #0f1824; }
.ProseMirror ul { padding-left: 24px; margin-bottom: 12px; list-style-type: disc; }
.ProseMirror ol { padding-left: 24px; margin-bottom: 12px; list-style-type: decimal; }
.ProseMirror li { margin-bottom: 4px; }
.ProseMirror blockquote { border-left: 4px solid #c0392b; padding: 8px 0 8px 16px; color: #6b7280; margin: 16px 0; font-style: italic; background: #fef9f9; border-radius: 0 8px 8px 0; }
.ProseMirror strong { font-weight: 700; }
.ProseMirror em { font-style: italic; }
.ProseMirror hr { border: none; border-top: 2px solid #f3f4f6; margin: 20px 0; }
.ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: #9ca3af; pointer-events: none; float: left; height: 0; }
`;

type Props = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

const ToolBtn = ({ onClick, active, title, children }: { onClick: () => void; active: boolean; title: string; children: React.ReactNode }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    style={{
      padding: '5px 8px', borderRadius: 6, border: 'none',
      background: active ? '#0f1824' : 'transparent',
      color: active ? '#fff' : '#374151',
      cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
      transition: 'background 0.15s',
    }}
  >
    {children}
  </button>
);

const Sep = () => <div style={{ width: 1, height: 20, background: '#e5e7eb', margin: '0 4px' }} />;

export const RichTextEditor = ({ value, onChange, placeholder = 'Rédigez votre article ici...' }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: { 'data-placeholder': placeholder } as Record<string, string>,
    },
  });

  if (!editor) return null;

  return (
    <>
      <style>{EDITOR_STYLES}</style>
      <div style={{ border: '1.5px solid #e5e7eb', borderRadius: 10, overflow: 'hidden', background: '#fff' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, padding: '8px 10px', borderBottom: '1px solid #f3f4f6', background: '#f9fafb', alignItems: 'center' }}>
          <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Gras (Ctrl+B)"><Bold size={14} /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italique (Ctrl+I)"><Italic size={14} /></ToolBtn>
          <Sep />
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Titre H2"><Heading2 size={14} /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Titre H3"><Heading3 size={14} /></ToolBtn>
          <Sep />
          <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Liste à puces"><List size={14} /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Liste numérotée"><ListOrdered size={14} /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Citation"><Quote size={14} /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} active={false} title="Séparateur"><Minus size={14} /></ToolBtn>
          <div style={{ flex: 1 }} />
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} active={false} title="Annuler"><Undo2 size={14} /></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} active={false} title="Refaire"><Redo2 size={14} /></ToolBtn>
        </div>
        <div style={{ maxHeight: 420, overflowY: 'auto' }}>
          <EditorContent editor={editor} />
        </div>
        <div style={{ padding: '6px 16px', borderTop: '1px solid #f3f4f6', background: '#fafafa', fontSize: 11, color: '#9ca3af', textAlign: 'right' }}>
          {editor.getText().length} caractères
        </div>
      </div>
    </>
  );
};
