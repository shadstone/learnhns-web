import type { APIRoute } from 'astro';
import { formatTelegramHtml } from '../../lib/telegram-community-export';

/**
 * Telegram Bot API HTML (parse_mode=HTML).
 * Not a full webpage — raw HTML fragment for bots / automation.
 */
export const GET: APIRoute = () => {
  const body = formatTelegramHtml();
  return new Response(body, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
