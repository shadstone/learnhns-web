import type { APIRoute } from 'astro';
import { formatTelegramPlain } from '../../lib/telegram-community-export';

/**
 * Compact plain-text pin (≤4096 chars, full URLs).
 * ?full=1 for longer labels (may exceed Telegram limit).
 */
export const GET: APIRoute = ({ url }) => {
  const full = url.searchParams.get('full') === '1';
  const body = formatTelegramPlain(full ? 'full' : 'compact');
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
};
