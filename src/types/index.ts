/**
 * Core types used across the application.
 * Centralizing these types prevents circular dependencies and improves code maintainability.
 */

/**
 * Represents a single block of content in the README editor.
 */
export type ReadmeBlock = {
  id: string;
  type: string;
  content?: string;
  [key: string]: unknown;
};

/**
 * Represents a block within a predefined template.
 */
export type TemplateBlock = {
  type: string;
  content: string;
};

/**
 * Represents a predefined template that users can choose from.
 */
export type Template = {
  id: string;
  title: string;
  description: string;
  icon: string;
  blocks: TemplateBlock[];
};

/**
 * View modes for the Preview pane.
 */
export type ViewMode = 'preview' | 'raw';
