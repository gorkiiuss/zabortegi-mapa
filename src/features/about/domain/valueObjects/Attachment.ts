// src/features/about/domain/valueObjects/Attachment.ts

import { MultilingualTextVO, type MultilingualText } from "./MultilingualText";

export type AttachmentType = "pdf" | "link" | "folder";

export interface Attachment {
  readonly type: AttachmentType;
  readonly label: MultilingualText;
  readonly url: string;
}

export const AttachmentVO = {
  hydrate: (raw: any): Attachment => {
    return {
      type: raw?.type ?? "link",
      label: MultilingualTextVO.hydrate(raw?.label),
      url: raw?.url ?? "",
    };
  },
};
