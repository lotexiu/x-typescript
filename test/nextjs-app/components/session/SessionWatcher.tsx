"use client";

import { useEffect } from "react";

let isLoggingOut = false;

export default function SessionWatcher() {
  useEffect(() => {
    let mounted = true;
    let knownExpires: number | null = null;
    let logoutTimer: ReturnType<typeof setTimeout> | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;

    const getCookie = (name: string) => {
      if (typeof document === 'undefined') return null;
      const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
      return m ? decodeURIComponent(m[1]) : null;
    };

    const doLogout = async () => {
      if (isLoggingOut) return;
      isLoggingOut = true;
      try {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
      } catch (_) {
        // ignore
      }
      // remove client cookie copy
      if (typeof document !== 'undefined') {
        document.cookie = 'session_expires=; Max-Age=0; path=/';
      }
      if (typeof window !== 'undefined') {
        // avoid redirect-loop if already on login
        const pathname = window.location.pathname || '';
        if (!pathname.startsWith('/login')) {
          window.location.href = '/login?expired=1';
        }
      }
    };

    const scheduleLogout = (expiresTs: number) => {
      knownExpires = expiresTs;
      const msLeft = expiresTs - Date.now();
      if (logoutTimer) clearTimeout(logoutTimer);
      if (msLeft <= 0) {
        // already expired
        void doLogout();
        return;
      }
      logoutTimer = setTimeout(() => {
        void doLogout();
      }, msLeft + 200);
    };

    const checkLocalExpiration = async () => {
      // If we're on /login page, do nothing here
      if (typeof window !== 'undefined') {
        const pathname = window.location.pathname || '';
        if (pathname.startsWith('/login')) return;
      }

      const cookieVal = getCookie('session_expires');
      if (cookieVal) {
        const expiresTs = Number(cookieVal);
        if (!Number.isNaN(expiresTs)) {
          // if changed or first seen, schedule logout
          if (knownExpires !== expiresTs) {
            scheduleLogout(expiresTs);
          }
          return;
        }
      }
    };

    // initial local check
    void checkLocalExpiration();
    // poll local cookie every 5s to detect refresh/login events without hitting server
    pollInterval = setInterval(checkLocalExpiration, 5000);

    return () => {
      mounted = false;
      if (pollInterval) clearInterval(pollInterval);
      if (logoutTimer) clearTimeout(logoutTimer);
      knownExpires = null;
    };
  }, []);

  return null;
}
