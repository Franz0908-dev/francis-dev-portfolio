import '@testing-library/jest-dom/vitest'

// jsdom does not implement native modal dialogs. Browser QA checks real focus trapping.
HTMLDialogElement.prototype.showModal = function () { this.open = true }
HTMLDialogElement.prototype.close = function () { this.open = false }
