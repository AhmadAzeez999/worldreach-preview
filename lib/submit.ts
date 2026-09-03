/**
 * Form submission entry point.
 *
 * The forms import from here rather than importing the server action directly,
 * because a `"use server"` module cannot exist anywhere in a static export's
 * module graph. In preview builds this file is aliased to `submit.static.ts`
 * (see next.config.ts), which keeps the action out of the graph entirely
 * instead of trying to tree-shake it away.
 */
export { submitEnquiry, submitShortMessage } from "@/app/actions/consultation";
