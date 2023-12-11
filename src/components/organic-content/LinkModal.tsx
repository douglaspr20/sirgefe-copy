'use client';
import React, { FC, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ArrowDown from '@assets/icons/ArrowDown';
import ArrowUp from '@assets/icons/ArrowUp';
import Image from 'next/image';
import CheckIcon from '@assets/img/check-mark.svg';
import { ExtendedEditorProps } from '@interfaces/trackableCopy';
import Tooltip from '@components/Tooltip';
import toolTipIcon from '@images/tooltip.svg';

const htmlToDraft =
  typeof window === 'object' && require('html-to-draftjs').default;

const Editor = dynamic(
  () =>
    import('react-draft-wysiwyg').then(
      (mod) => mod.Editor as React.ComponentType<ExtendedEditorProps>,
    ),
  { ssr: false },
);

const addShortLink = (position: string, path: string) => {
  const rootDiv: HTMLDivElement | null = document.querySelector(
    '[data-contents="true"]',
  );
  if (!rootDiv) {
    return;
  }

  const existingSpan = rootDiv.querySelector('span[id="shortURL"]');

  const newSpan = document.createElement('span');
  newSpan.id = 'shortURL';
  newSpan.style.backgroundColor = '#E7FBFD';
  newSpan.style.width = 'max-content';
  newSpan.style.padding = '3px';
  newSpan.style.color = '#32C4D4';
  newSpan.style.fontWeight = 'bold';
  newSpan.style.display = 'flex';
  newSpan.innerHTML = `<span data-text="true">https://${process.env.NEXT_PUBLIC_SHORT_URL}/${path}</span>`;

  if (existingSpan) {
    existingSpan.remove();
  }
  if (position === 'top') {
    rootDiv.insertBefore(newSpan, rootDiv.firstChild);
  } else if (position === 'bottom') {
    rootDiv.appendChild(newSpan);
  }
};

const trackableCopyTypes = ['facebook', 'instagram', 'linkedin'];

const handleCopy = async (
  text: string,
  short_code: string,
  position: string,
  setCopyContent: (value: boolean) => void,
) => {
  try {
    if (!navigator.clipboard) {
      console.log("Browser don't have support for native clipboard.");
    }
    let copyHtml = '';
    let copyText = '';
    const regex = /(<([^>]+)>)/gi;
    const updatedText = text.replace(regex, '');
    if (position === 'top') {
      copyHtml = `https://${process.env.NEXT_PUBLIC_SHORT_URL}/${short_code}\n${text}`;
      copyText = `https://${
        process.env.NEXT_PUBLIC_SHORT_URL
      }/${short_code} ${' '} ${text.replace(regex, '')}`;
    } else {
      copyHtml = `${text}\nhttps://${process.env.NEXT_PUBLIC_SHORT_URL}/${short_code}`;
      copyText = `${updatedText} ${' '} https://${
        process.env.NEXT_PUBLIC_SHORT_URL
      }/${short_code}`;
    }
    await navigator.clipboard.write([
      new ClipboardItem({
        'text/html': new Blob([copyHtml], { type: 'text/html' }),
        'text/plain': new Blob([copyText], { type: 'text/plain' }),
      }),
    ]);
    setCopyContent(true);
    setTimeout(() => {
      setCopyContent(false);
    }, 500);
  } catch (error) {
    console.log(error);
  }
};

interface Props {
  linkModalActive: boolean;
  handleCreateTrackableCopy: () => void;
  handleUpdateTrackableCopy: () => void;
  handleCancel?: () => void;
  isLoading?: boolean;
  path: string;
  setUniquePath: (path: string) => void;
  trackableCopyName: string;
  setTrackableCopyName: (name: string) => void;
  destinationURL: string;
  setDestinationURL: (url: string) => void;
  description: string;
  setDescription: (description: string) => void;
  setEditLinkOptions: (value: any) => void;
  editLinkOptions?: any;
  shortURLPosition: string;
  setShortURLPosition: (position: string) => void;
  trackableCopyType: string;
  copyNameError: string | null;
  setCopyNameError: (error: string | null) => void;
  copyURLError: string | null;
  setCopyURLError: (error: string | null) => void;
}

const LinkModal: FC<Props> = ({
  linkModalActive,
  handleCreateTrackableCopy,
  handleCancel,
  isLoading,
  trackableCopyName,
  setTrackableCopyName,
  destinationURL,
  setDestinationURL,
  description,
  setDescription,
  path,
  editLinkOptions,
  setEditLinkOptions,
  handleUpdateTrackableCopy,
  shortURLPosition,
  setShortURLPosition,
  trackableCopyType,
  copyNameError,
  setCopyNameError,
  copyURLError,
  setCopyURLError,
}) => {
  const contentBlock = htmlToDraft(
    editLinkOptions?.active ? editLinkOptions?.description : description,
  );
  const contentState = ContentState.createFromBlockArray(
    contentBlock.contentBlocks,
  );
  const editorStateInitial = EditorState.createWithContent(contentState);

  const [editorState, setEditorState] = useState(editorStateInitial);
  const [copyContent, setCopyContent] = useState(false);

  useEffect(() => {
    if (editLinkOptions?.active) {
      const contentBlock = htmlToDraft(editLinkOptions?.description);
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorStateInitial = EditorState.createWithContent(contentState);
      setEditorState(editorStateInitial);
      addShortLink(editLinkOptions?.position, editLinkOptions?.short_code);
    }
  }, [editLinkOptions?.active]);

  useEffect(() => {
    if (linkModalActive && !editLinkOptions?.active) {
      const contentBlock = htmlToDraft('');
      const contentState = ContentState.createFromBlockArray(
        contentBlock.contentBlocks,
      );
      const editorStateInitial = EditorState.createWithContent(contentState);
      setEditorState(editorStateInitial);
      addShortLink('top', '*');
    }
    if (!linkModalActive && path) {
      addShortLink('top', path);
    }
  }, [linkModalActive, path]);

  const handleContentChange = (editorStateData: EditorState) => {
    if (editLinkOptions?.active) {
      setEditorState(editorStateData);
      const currentContent = editorStateData.getCurrentContent();
      const html = draftToHtml(convertToRaw(currentContent));
      setEditLinkOptions({
        ...editLinkOptions,
        description: html,
      });
    } else {
      setEditorState(editorStateData);
      const currentContent = editorStateData.getCurrentContent();
      const html = draftToHtml(convertToRaw(currentContent));
      setDescription(html);
    }
  };

  useEffect(() => {
    if (editLinkOptions?.active) {
      setTimeout(() => {
        addShortLink(editLinkOptions?.position, editLinkOptions?.short_code);
      }, 100);
    }
  }, [editLinkOptions?.active]);

  useEffect(() => {
    if (path || editLinkOptions?.active) {
      addShortLink(
        editLinkOptions?.active ? editLinkOptions?.position : shortURLPosition,
        editLinkOptions?.active ? editLinkOptions?.short_code : path,
      );
    }
  }, [shortURLPosition, editLinkOptions?.position]);

  return (
    <div className="px-4 py-8">
      {isLoading && (
        <div className="flex items-center justify-center bg-white absolute left-px right-px top-[0px] bottom-[0px] z-[100]">
          <div className="inline-flex items-center justify-center flex-col">
            <div className="spinner"></div>
            <div className="font-semibold text-primaryColor mt-3">
              Updating Results
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center">
        <div className="mx-auto">
          <h2 className="h2 mb-4 flex items-center">
            {trackableCopyType === 'linkedin'
              ? 'LinkedIn Bio'
              : trackableCopyType === 'instagram'
              ? 'Instagram Bio'
              : trackableCopyType === 'facebook'
              ? 'Facebook Page Description'
              : 'Social Media'}
          </h2>
        </div>
        <div className="w-full mb-3">
          <label className="form-label inline-flex mr-1">Name</label>
          <span className="form-label">
            {editLinkOptions?.active
              ? editLinkOptions?.name?.length
              : trackableCopyName?.length || 0}
            /25
          </span>
          <div>
            <input
              className="input"
              placeholder={`My Link`}
              type="text"
              id="name"
              maxLength={25}
              value={
                editLinkOptions?.active
                  ? editLinkOptions?.name
                  : trackableCopyName
              }
              onChange={(e) => {
                if (editLinkOptions?.active) {
                  setEditLinkOptions({
                    ...editLinkOptions,
                    name: e.target.value,
                  });
                } else {
                  setTrackableCopyName(e.target.value);
                  setCopyNameError(null);
                }
              }}
              disabled={
                trackableCopyTypes.includes(trackableCopyType) ||
                trackableCopyTypes.includes(editLinkOptions?.type)
              }
            />
            {copyNameError && (
              <span className="text-warningColor text-xs">{copyNameError}</span>
            )}
          </div>
        </div>
        <div className="mb-1 inline-flex justify-between items-center w-full gap-3">
          <div className="w-full">
            <div className="flex">
              <label className="form-label inline-flex">Destination link</label>
              {editLinkOptions?.active && (
                <>
                  <span
                    className="ml-1 mt-[1.5px] cursor-pointer"
                    id="edit-info-tp"
                  >
                    <Image
                      src={toolTipIcon}
                      alt="tooltip-info"
                      width={13}
                      height={13}
                      id="edit-info-tp"
                    />
                  </span>

                  <Tooltip
                    title="When changing your destination url after it has been set, it may take up to 24 hours to propagate"
                    anchorId="edit-info-tp"
                  />
                </>
              )}
            </div>

            <div className="flex items-center">
              <input
                className="input"
                placeholder="yourstore.com/collections/all"
                type="text"
                id="destination"
                value={
                  editLinkOptions?.active
                    ? editLinkOptions?.destination_url
                    : destinationURL
                }
                onChange={(e) => {
                  if (editLinkOptions?.active) {
                    setEditLinkOptions({
                      ...editLinkOptions,
                      destination_url: e.target.value,
                    });
                    setCopyURLError(null);
                  } else {
                    setDestinationURL(e.target.value);
                    setCopyURLError(null);
                  }
                }}
              />
            </div>
          </div>
          <i className="icon-connect text-xl link mt-6" />
          <div className="w-full">
            <label className="form-label inline-flex">Short link</label>
            <input
              className="input"
              placeholder={`https://${process.env.NEXT_PUBLIC_SHORT_URL}/${
                editLinkOptions?.active ? editLinkOptions?.short_code : path
              }`}
              type="text"
              id="path"
              disabled
            />
          </div>
        </div>
        <div className="w-full">
          {copyURLError && (
            <span className="text-warningColor text-xs">{copyURLError}</span>
          )}
        </div>
        <div className="mt-5 w-full">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <label className="form-label inline-flex">Content</label>
              <button
                onClick={() => {
                  if (shortURLPosition === 'top' && !editLinkOptions?.active)
                    setShortURLPosition('bottom');
                  if (shortURLPosition === 'bottom' && !editLinkOptions?.active)
                    setShortURLPosition('top');
                  if (
                    editLinkOptions?.position === 'top' &&
                    editLinkOptions?.active
                  )
                    setEditLinkOptions({
                      ...editLinkOptions,
                      position: 'bottom',
                    });
                  if (
                    editLinkOptions?.position === 'bottom' &&
                    editLinkOptions?.active
                  )
                    setEditLinkOptions({
                      ...editLinkOptions,
                      position: 'top',
                    });
                }}
                className="border border-borderLightColor"
              >
                {(!editLinkOptions?.active && shortURLPosition === 'top') ||
                (editLinkOptions?.active &&
                  editLinkOptions?.position === 'top') ? (
                  <ArrowDown />
                ) : (
                  <ArrowUp />
                )}
              </button>
            </div>

            <button
              className="relative flex items-center font-medium text-primaryColor hover:text-primaryColorHover cursor-pointer disabled:opacity-50"
              onClick={() =>
                handleCopy(
                  editLinkOptions?.active
                    ? editLinkOptions?.description
                    : description,
                  editLinkOptions?.active ? editLinkOptions?.short_code : path,
                  editLinkOptions?.active
                    ? editLinkOptions?.position
                    : shortURLPosition,
                  setCopyContent,
                )
              }
            >
              <i className="icon-copy text-xl mr-2"></i>Copy
              <div
                className={`${
                  !copyContent && 'hidden'
                } inline-flex items-center bg-white border rounded-md border-extraLightColor px-4 py-2 shadow-lg whitespace-nowrap absolute min-w-[225px] -top-11 z-40 left-[50%] -translate-x-[50%] `}
              >
                <span className="inline-flex items-center justify-center mr-1.5 flex-shrink-0">
                  <Image src={CheckIcon} alt="check-icon" />
                </span>
                <span className="text-textSecondaryColor font-semibold">
                  Copied to clipboard
                </span>
              </div>
            </button>
          </div>

          <Editor
            toolbarClassName="toolbarClassName toolbarClassName"
            wrapperClassName="wrapperClassName flex flex-col-reverse"
            editorClassName="editorClassName border-t border-x border-borderLightColor rounded-t px-4"
            editorStyle={{
              minHeight: '200px',
              maxHeight: '200px',
              overflowY: 'auto',
            }}
            stripPastedStyles={true}
            editorState={editorState}
            onCut={(_, e: any) => e.preventDefault()}
            onEditorStateChange={handleContentChange}
            toolbar={{
              options: [
                'history',
                'blockType',
                'textAlign',
                'inline',
                'list',
                'link',
                'emoji',
              ],
              blockType: {
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
              },
              textAlign: {
                inDropdown: true,
              },
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough'],
              },
              list: {
                options: ['unordered', 'ordered'],
              },
            }}
          />
        </div>
        <div className="w-full flex gap-4 justify-end items-center mt-4">
          <button
            className="btn light"
            onClick={handleCancel}
            style={{
              padding: '0.7rem 1.5rem',
              maxHeight: 'none',
            }}
          >
            Cancel
          </button>
          <button
            disabled={
              isLoading ||
              (editLinkOptions?.active &&
                (editLinkOptions?.name === '' ||
                  editLinkOptions?.destination_url === '' ||
                  editLinkOptions?.short_code === '')) ||
              (!editLinkOptions?.active &&
                (trackableCopyName === '' ||
                  destinationURL === '' ||
                  path === ''))
            }
            className="btn"
            onClick={() => {
              if (editLinkOptions?.active) {
                handleUpdateTrackableCopy();
              } else {
                handleCreateTrackableCopy();
              }
            }}
            style={{
              padding: '0.7rem 1.5rem',
              maxHeight: 'none',
            }}
          >
            {!editLinkOptions?.active ? 'Create' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;
