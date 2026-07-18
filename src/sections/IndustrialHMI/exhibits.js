// Industrial HMI exhibits - extracted verbatim from the Claude Design handoff
// (Case Study - Physical HMI.dc.html). These are the sealed "industrial dark"
// design system: rendered as-is inside the page, never restyled to match it.
// Decorative markup only (buttons converted to spans, runtime attrs stripped).

export const EXHIBITS = {
  heroHome: {
    naturalWidth: 844,
    naturalHeight: 560,
    maxScale: 1.0,
    html: `      <div style="position:absolute;top:0;left:0;transform-origin:top left">

    <!-- bezel (from HMI_HOME_STATEFIRST_7, unmodified) -->
    <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
      <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
        <div style="display:flex;align-items:center;gap:9px">
          <span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span>
          <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span>
        </div>
        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
      </div>

      <!-- ===== 800×480 SCREEN ===== -->
      <div data-screen-label="HMI_HOME_STATEFIRST_7" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">

        <!-- TOP BAR -->
        <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
          <div style="display:flex;align-items:center;gap:2px">
            <span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
            </span>
            <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Home</span>
          </div>
          <div style="display:flex;align-items:center;gap:0">
            <span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg>
            </span>
            <span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg>
            </span>
            <div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div>
            <span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg>
            </span>
            <span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg>
            </span>
            <span title="Tile view · active" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#2E9BE6;cursor:pointer;border-radius:6px;position:relative">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg>
              <span style="position:absolute;left:9px;right:9px;bottom:5px;height:2px;border-radius:2px;background:#2E9BE6"></span>
            </span>
          </div>
        </div>

        <!-- CONTENT AREA -->
        <div style="flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:14px;background:#0E1217;min-height:0">

          <!-- SURFACED WARNING BANNER -->
          <span style="flex:none;height:62px;display:flex;align-items:center;gap:15px;padding:0 12px 0 16px;background:#241d10;border:1px solid #4a3a17;border-left:5px solid #F5A623;border-radius:7px;cursor:pointer;text-align:left;width:100%">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#241d10" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#241d10" stroke-width="2.2" stroke-linecap="round"/></svg>
            <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
              <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:18px;letter-spacing:.01em;color:#F5A623;line-height:1.05">HIGH AIREND DISCHARGE TEMP</span>
              <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:12.5px;color:#c9a86a">Approaching trip limit · <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;color:#e0c184">221 °F</span> and rising</span>
            </div>
            <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;color:#c9a86a;flex:none">W.04</span>
            <span style="flex:none;display:inline-flex;align-items:center;gap:7px;height:44px;padding:0 15px;background:#14344A;border:1px solid #1F6FAF;border-radius:6px">
              <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.06em;color:#57B0EC">VIEW</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57B0EC" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
            </span>
          </span>

          <!-- 5-TILE GRID -->
          <div style="flex:1;display:flex;gap:12px;min-height:0">

            <!-- PROTECTED PRIMARY -->
            <div style="width:246px;flex:none;background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:15px 17px;display:flex;flex-direction:column">
              <div style="display:flex;align-items:center;justify-content:space-between">
                <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Discharge Pressure</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg>
              </div>
              <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
                <div style="display:flex;align-items:baseline;gap:9px">
                  <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:72px;line-height:.9;color:#F3F6FA;letter-spacing:-.02em">102</span>
                  <span style="font-family:'IBM Plex Sans';font-weight:500;font-size:18px;color:#8892A0">PSI</span>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:7px;padding-top:11px;border-top:1px solid #232b36">
                <span style="width:6px;height:6px;border-radius:50%;background:#2FBF71;flex:none"></span>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">Protected primary · locked</span>
              </div>
            </div>

            <!-- RIGHT 2×2 -->
            <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;min-width:0">

              <!-- Airend Temp · WARNING BAND -->
              <div style="background:#151b24;border:1px solid #2A313D;border-left:4px solid #F5A623;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                <div style="display:flex;align-items:center;justify-content:space-between">
                  <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Airend Temp</span>
                  <svg width="19" height="19" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#151b24" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#151b24" stroke-width="2.1" stroke-linecap="round"/></svg>
                </div>
                <div style="flex:1;display:flex;align-items:center;gap:6px">
                  <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">221</span>
                  <span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">°F</span>
                </div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;letter-spacing:.09em;color:#F5A623;text-transform:uppercase">Approaching limit</span>
              </div>

              <!-- % Capacity -->
              <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">% Capacity</span>
                <div style="flex:1;display:flex;align-items:center;gap:6px">
                  <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">78</span>
                  <span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">%</span>
                </div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Within limits</span>
              </div>

              <!-- Motor Current -->
              <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Current</span>
                <div style="flex:1;display:flex;align-items:center;gap:6px">
                  <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">112</span>
                  <span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">A</span>
                </div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Within limits</span>
              </div>

              <!-- Running Hours -->
              <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Running Hours</span>
                <div style="flex:1;display:flex;align-items:center;gap:6px">
                  <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">12,480</span>
                  <span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">h</span>
                </div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Total runtime</span>
              </div>

            </div>
          </div>

        </div>

        <!-- STATUS STRIP (warning active · alternates) -->
        <div class="hmi-status-strip" style="height:44px;flex:none;display:flex;align-items:center;gap:12px;padding:0 16px;background:#212834;border-top:1px solid #2A313D;border-left:5px solid #F5A623">
          <span class="hmi-strip-state hmi-strip-state--running">
            <span style="display:flex;align-items:center;gap:12px">
              <span style="width:9px;height:9px;border-radius:50%;background:#2FBF71;flex:none;animation:hmi-pulse 2.4s ease-in-out infinite"></span>
              <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#2FBF71">RUNNING — LOADED</span>
            </span>
          </span>
          <span class="hmi-strip-state hmi-strip-state--warning">
            <span style="display:flex;align-items:center;gap:11px">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#212834" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#212834" stroke-width="2.1" stroke-linecap="round"/></svg>
              <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#F5A623">HIGH AIREND DISCHARGE TEMP</span>
            </span>
          </span>
          <span class="hmi-strip-code" style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#7a6a45">W.04</span>
        </div>

        <!-- META BAR -->
        <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
          <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
          <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg>
            <span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span>
          </div>
          <div style="display:flex;align-items:center;gap:1px">
            <span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg>
              <span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span>
            </span>
            <div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div>
            <span title="Motor status · running" style="width:48px;height:48px;display:grid;place-items:center;color:#2FBF71">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="animation:hmi-spin 2.8s linear infinite;transform-origin:50% 50%"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg>
            </span>
            <span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg>
            </span>
            <span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;cursor:pointer;border-radius:6px">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg>
            </span>
          </div>
        </div>

      </div>
    </div>

      </div>
    `,
  },
  beforeAfter: {
    naturalWidth: 1158,
    naturalHeight: 415,
    maxScale: 1,
    html: `        <div style="position:absolute;top:0;left:0;transform:scale(.66);transform-origin:top left;display:flex;gap:40px;align-items:flex-start">

          <!-- BEFORE -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div style="font-family:'Source Code Pro',monospace;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#cbc8bf">Before · warning buried</div>
            <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
                <div style="display:flex;align-items:center;gap:9px">
                  <span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span>
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span>
                </div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
              </div>
              <div data-screen-label="HMI_HOME_BURIED_7" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">
                <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
                  <div style="display:flex;align-items:center;gap:2px">
                    <span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span>
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Home</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:0">
                    <span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span>
                    <span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span>
                    <div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div>
                    <span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span>
                    <span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span>
                    <span title="Tile view · active" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#2E9BE6;border-radius:6px;position:relative"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg><span style="position:absolute;left:9px;right:9px;bottom:5px;height:2px;border-radius:2px;background:#2E9BE6"></span></span>
                  </div>
                </div>
                <div style="flex:1;padding:12px 14px;display:grid;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr 1fr;gap:10px;background:#0E1217;min-height:0">
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Discharge Pressure</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a5361" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></div>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">102</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">PSI</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <div style="display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Airend Temp</span><span title="approaching limit" style="width:6px;height:6px;border-radius:50%;background:#7a5f2e;flex:none"></span></div>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">221</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">°F</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">% Capacity</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">78</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">%</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Current</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">112</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">A</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Power</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">74</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">kW</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Coolant Temp</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">176</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">°F</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">DC Bus Voltage</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">648</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">V</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Loaded Hours</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">9,240</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">h</span></div>
                  </div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:7px;padding:11px 13px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Daily Energy</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:31px;line-height:1;color:#F3F6FA">641</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">kWh</span></div>
                  </div>
                </div>
                <div style="height:44px;flex:none;display:flex;align-items:center;gap:12px;padding:0 16px;background:#212834;border-top:1px solid #2A313D;border-left:5px solid #2FBF71">
                  <span style="width:9px;height:9px;border-radius:50%;background:#2FBF71;flex:none;animation:hmi-pulse 2.4s ease-in-out infinite"></span>
                  <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#2FBF71">RUNNING — LOADED</span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.12em;color:#4a5361;text-transform:uppercase">Machine status</span>
                </div>
                <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                  <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg>
                    <span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:1px">
                    <span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span></span>
                    <div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div>
                    <span title="Motor status · running" style="width:48px;height:48px;display:grid;place-items:center;color:#2FBF71"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="animation:hmi-spin 2.8s linear infinite;transform-origin:50% 50%"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span>
                    <span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span>
                    <span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- AFTER -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div style="font-family:'Source Code Pro',monospace;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:var(--accent)">After · state-first</div>
            <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
                <div style="display:flex;align-items:center;gap:9px">
                  <span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span>
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span>
                </div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
              </div>
              <div data-screen-label="HMI_HOME_STATEFIRST_7 · after" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">
                <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
                  <div style="display:flex;align-items:center;gap:2px">
                    <span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span>
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Home</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:0">
                    <span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span>
                    <span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span>
                    <div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div>
                    <span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span>
                    <span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span>
                    <span title="Tile view · active" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#2E9BE6;border-radius:6px;position:relative"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg><span style="position:absolute;left:9px;right:9px;bottom:5px;height:2px;border-radius:2px;background:#2E9BE6"></span></span>
                  </div>
                </div>
                <div style="flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:14px;background:#0E1217;min-height:0">
                  <div style="flex:none;height:62px;display:flex;align-items:center;gap:15px;padding:0 12px 0 16px;background:#241d10;border:1px solid #4a3a17;border-left:5px solid #F5A623;border-radius:7px;text-align:left;width:100%">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#241d10" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#241d10" stroke-width="2.2" stroke-linecap="round"/></svg>
                    <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px">
                      <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:18px;letter-spacing:.01em;color:#F5A623;line-height:1.05">HIGH AIREND DISCHARGE TEMP</span>
                      <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:12.5px;color:#c9a86a">Approaching trip limit · <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;color:#e0c184">221 °F</span> and rising</span>
                    </div>
                    <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;color:#c9a86a;flex:none">W.04</span>
                    <span style="flex:none;display:inline-flex;align-items:center;gap:7px;height:44px;padding:0 15px;background:#14344A;border:1px solid #1F6FAF;border-radius:6px">
                      <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.06em;color:#57B0EC">VIEW</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57B0EC" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>
                    </span>
                  </div>
                  <div style="flex:1;display:flex;gap:12px;min-height:0">
                    <div style="width:246px;flex:none;background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:15px 17px;display:flex;flex-direction:column">
                      <div style="display:flex;align-items:center;justify-content:space-between">
                        <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Discharge Pressure</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg>
                      </div>
                      <div style="flex:1;display:flex;flex-direction:column;justify-content:center">
                        <div style="display:flex;align-items:baseline;gap:9px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:72px;line-height:.9;color:#F3F6FA;letter-spacing:-.02em">102</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:18px;color:#8892A0">PSI</span></div>
                      </div>
                      <div style="display:flex;align-items:center;gap:7px;padding-top:11px;border-top:1px solid #232b36"><span style="width:6px;height:6px;border-radius:50%;background:#2FBF71;flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">Protected primary · locked</span></div>
                    </div>
                    <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;min-width:0">
                      <div style="background:#151b24;border:1px solid #2A313D;border-left:4px solid #F5A623;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                        <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Airend Temp</span><svg width="19" height="19" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#151b24" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#151b24" stroke-width="2.1" stroke-linecap="round"/></svg></div>
                        <div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">221</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">°F</span></div>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;letter-spacing:.09em;color:#F5A623;text-transform:uppercase">Approaching limit</span>
                      </div>
                      <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                        <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">% Capacity</span>
                        <div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">78</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">%</span></div>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Within limits</span>
                      </div>
                      <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                        <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Current</span>
                        <div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">112</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">A</span></div>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Within limits</span>
                      </div>
                      <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column">
                        <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Running Hours</span>
                        <div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">12,480</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">h</span></div>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Total runtime</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="height:44px;flex:none;display:flex;align-items:center;gap:12px;padding:0 16px;background:#212834;border-top:1px solid #2A313D;border-left:5px solid #F5A623">
                  <span style="display:flex;align-items:center;gap:11px">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#212834" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#212834" stroke-width="2.1" stroke-linecap="round"/></svg>
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#F5A623">HIGH AIREND DISCHARGE TEMP</span>
                  </span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#7a6a45">W.04</span>
                </div>
                <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                  <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg>
                    <span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:1px">
                    <span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span></span>
                    <div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div>
                    <span title="Motor status · running" style="width:48px;height:48px;display:grid;place-items:center;color:#2FBF71"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="animation:hmi-spin 2.8s linear infinite;transform-origin:50% 50%"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span>
                    <span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span>
                    <span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      `,
  },
  filterTrio: {
    naturalWidth: 1214,
    naturalHeight: 262,
    maxScale: 1,
    html: `        <div style="position:absolute;top:0;left:0;transform:scale(.72);transform-origin:top left;display:flex;align-items:center;gap:0">

          <!-- P1 -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#8892A0">HMI_ALARM_FILTER_43_P1 · dates</span>
            <div style="padding:16px;background:#0b0d11;border:1px solid #23262c;border-radius:14px;box-shadow:0 2px 14px rgba(0,0,0,.5)">
              <div data-screen-label="HMI_ALARM_FILTER_43_P1" style="width:480px;height:270px;background:#0E1217;border:1px solid #000;border-radius:4px;overflow:hidden;display:flex;flex-direction:column">
                <div style="height:48px;flex:none;display:flex;align-items:center;gap:4px;padding:0 4px;background:#141922;border-bottom:1px solid #2A313D">
                  <span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#57B0EC;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></span>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A6B0BE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16l-6.2 7.4V19l-3.6-2v-4.6z"/></svg>
                  <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#F3F6FA">Alarm Filter</span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#8892A0">1 / 3</span>
                  <span style="display:flex;gap:4px;align-items:center;padding:0 4px"><span style="width:7px;height:7px;border-radius:50%;background:#2E9BE6"></span><span style="width:7px;height:7px;border-radius:50%;background:#3A4352"></span><span style="width:7px;height:7px;border-radius:50%;background:#3A4352"></span></span>
                  <span title="Next page" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#57B0EC;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>
                </div>
                <div style="flex:1;padding:13px 14px;display:flex;flex-direction:column;gap:12px;min-height:0">
                  <div>
                    <div style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8892A0;margin-bottom:7px">Start date / time</div>
                    <div style="display:flex;gap:8px">
                      <span style="height:48px;flex:1.5;display:flex;align-items:center;justify-content:space-between;padding:0 12px;background:#0E1217;border:1px solid #2A313D;border-radius:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-size:16px;color:#F3F6FA">2024-05-15</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8 3.5v4M16 3.5v4"/></svg></span>
                      <span style="height:48px;flex:1;display:flex;align-items:center;justify-content:space-between;padding:0 12px;background:#0E1217;border:1px solid #2A313D;border-radius:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-size:16px;color:#F3F6FA">08:15</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.6V12l3 2"/></svg></span>
                    </div>
                  </div>
                  <div>
                    <div style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8892A0;margin-bottom:7px">End date / time</div>
                    <div style="display:flex;gap:8px">
                      <span style="height:48px;flex:1.5;display:flex;align-items:center;justify-content:space-between;padding:0 12px;background:#0E1217;border:1px solid #2A313D;border-radius:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-size:16px;color:#F3F6FA">2024-05-15</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5.5" width="16" height="15" rx="2"/><path d="M4 9.5h16M8 3.5v4M16 3.5v4"/></svg></span>
                      <span style="height:48px;flex:1;display:flex;align-items:center;justify-content:space-between;padding:0 12px;background:#0E1217;border:1px solid #2A313D;border-radius:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-size:16px;color:#F3F6FA">14:32</span><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 7.6V12l3 2"/></svg></span>
                    </div>
                  </div>
                </div>
                <div style="height:58px;flex:none;display:flex;align-items:center;gap:8px;padding:0 12px;background:#141922;border-top:1px solid #2A313D">
                  <span style="height:48px;flex:1;background:transparent;color:#F3F6FA;border:1px solid #3A4352;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">CANCEL</span>
                  <span style="height:48px;flex:1;background:transparent;color:#57B0EC;border:none;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">RESET</span>
                  <span style="height:48px;flex:1.4;background:#2E9BE6;color:#08121b;border:none;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">APPLY</span>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 14px"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3A4352" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg></div>

          <!-- P2 -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#8892A0">HMI_ALARM_FILTER_43_P2 · event name</span>
            <div style="padding:16px;background:#0b0d11;border:1px solid #23262c;border-radius:14px;box-shadow:0 2px 14px rgba(0,0,0,.5)">
              <div data-screen-label="HMI_ALARM_FILTER_43_P2" style="width:480px;height:270px;background:#0E1217;border:1px solid #000;border-radius:4px;overflow:hidden;display:flex;flex-direction:column">
                <div style="height:48px;flex:none;display:flex;align-items:center;gap:4px;padding:0 4px;background:#141922;border-bottom:1px solid #2A313D">
                  <span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#57B0EC;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></span>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A6B0BE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16l-6.2 7.4V19l-3.6-2v-4.6z"/></svg>
                  <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#F3F6FA">Alarm Filter</span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#8892A0">2 / 3</span>
                  <span style="display:flex;gap:4px;align-items:center;padding:0 4px"><span style="width:7px;height:7px;border-radius:50%;background:#3A4352"></span><span style="width:7px;height:7px;border-radius:50%;background:#2E9BE6"></span><span style="width:7px;height:7px;border-radius:50%;background:#3A4352"></span></span>
                  <span title="Next page" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#57B0EC;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>
                </div>
                <div style="flex:1;padding:13px 14px;display:flex;flex-direction:column;gap:10px;min-height:0">
                  <div style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8892A0">Event name</div>
                  <div style="display:flex;align-items:center;justify-content:space-between;height:44px;padding:0 13px;background:#0E1217;border:1px solid #3A4352;border-radius:6px">
                    <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:16px;letter-spacing:.02em;color:#F3F6FA;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">All Events</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex:none"><path d="M5 12.5l4.2 4.2L19 7"/></svg>
                  </div>
                  <div style="display:flex;align-items:stretch;gap:9px">
                    <div style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:2px;height:56px;padding:0 13px;background:#0E1217;border:1px solid #2A313D;border-radius:6px">
                      <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#6D7887">Step to</span>
                      <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:15px;letter-spacing:.02em;color:#2E9BE6;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">High Airend Discharge Temp</span>
                    </div>
                    <span style="width:52px;height:56px;flex:none;display:grid;place-items:center;background:#171C24;border:1px solid #2A313D;border-radius:6px;color:#A6B0BE"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6"/></svg></span>
                    <span style="width:52px;height:56px;flex:none;display:grid;place-items:center;background:#171C24;border:1px solid #2A313D;border-radius:6px;color:#A6B0BE"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
                    <span style="width:60px;height:56px;flex:none;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;background:#2E9BE6;color:#08121b;border:none;border-radius:6px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:9px;letter-spacing:.06em">OK</span></span>
                  </div>
                  <p style="margin:0;font-family:'IBM Plex Sans';font-size:10.5px;line-height:1.45;color:#6D7887">Arrows step · extra tap on <span style="color:#57B0EC;font-weight:600">OK</span> commits.</p>
                </div>
                <div style="height:58px;flex:none;display:flex;align-items:center;gap:8px;padding:0 12px;background:#141922;border-top:1px solid #2A313D">
                  <span style="height:48px;flex:1;background:transparent;color:#F3F6FA;border:1px solid #3A4352;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">CANCEL</span>
                  <span style="height:48px;flex:1;background:transparent;color:#57B0EC;border:none;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">RESET</span>
                  <span style="height:48px;flex:1.4;background:#2E9BE6;color:#08121b;border:none;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">APPLY</span>
                </div>
              </div>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;align-items:center;gap:5px;padding:0 14px"><svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3A4352" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg></div>

          <!-- P3 -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:10px">
            <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#8892A0">HMI_ALARM_FILTER_43_P3 · event type</span>
            <div style="padding:16px;background:#0b0d11;border:1px solid #23262c;border-radius:14px;box-shadow:0 2px 14px rgba(0,0,0,.5)">
              <div data-screen-label="HMI_ALARM_FILTER_43_P3" style="width:480px;height:270px;background:#0E1217;border:1px solid #000;border-radius:4px;overflow:hidden;display:flex;flex-direction:column">
                <div style="height:48px;flex:none;display:flex;align-items:center;gap:4px;padding:0 4px;background:#141922;border-bottom:1px solid #2A313D">
                  <span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#57B0EC;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></span>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A6B0BE" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5h16l-6.2 7.4V19l-3.6-2v-4.6z"/></svg>
                  <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#F3F6FA">Alarm Filter</span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#8892A0">3 / 3</span>
                  <span style="display:flex;gap:4px;align-items:center;padding:0 4px"><span style="width:7px;height:7px;border-radius:50%;background:#3A4352"></span><span style="width:7px;height:7px;border-radius:50%;background:#3A4352"></span><span style="width:7px;height:7px;border-radius:50%;background:#2E9BE6"></span></span>
                  <span title="Last page" style="width:48px;height:48px;display:grid;place-items:center;color:#3A4352"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>
                </div>
                <div style="flex:1;padding:13px 14px;display:flex;flex-direction:column;gap:9px;min-height:0">
                  <div style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:#8892A0">Event type</div>
                  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px;min-height:0">
                    <div style="position:relative;display:flex;align-items:center;justify-content:center;background:#0E1217;border:1px solid #2A313D;border-radius:7px;font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#C4CCD6">All</div>
                    <div style="position:relative;display:flex;align-items:center;justify-content:center;background:#0E1217;border:1px solid #2A313D;border-radius:7px;font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#C4CCD6">Fault</div>
                    <div style="position:relative;display:flex;align-items:center;justify-content:center;background:#0E1217;border:1px solid #2A313D;border-radius:7px;font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#C4CCD6">Warning
                      <span style="position:absolute;inset:0;border:2px solid #2E9BE6;border-radius:7px;pointer-events:none"></span><span style="position:absolute;top:7px;right:7px;width:20px;height:20px;border-radius:50%;background:#2E9BE6;display:grid;place-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#08121b" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.2 4.2L19 7"/></svg></span>
                    </div>
                    <div style="position:relative;display:flex;align-items:center;justify-content:center;background:#0E1217;border:1px solid #2A313D;border-radius:7px;font-family:'IBM Plex Sans';font-weight:600;font-size:15px;color:#C4CCD6">Information</div>
                  </div>
                </div>
                <div style="height:58px;flex:none;display:flex;align-items:center;gap:8px;padding:0 12px;background:#141922;border-top:1px solid #2A313D">
                  <span style="height:48px;flex:1;background:transparent;color:#F3F6FA;border:1px solid #3A4352;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">CANCEL</span>
                  <span style="height:48px;flex:1;background:transparent;color:#57B0EC;border:none;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">RESET</span>
                  <span style="height:48px;flex:1.4;background:#2E9BE6;color:#08121b;border:none;border-radius:6px;display:flex;align-items:center;justify-content:center;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.04em">APPLY</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      `,
  },
  threeSize: {
    naturalWidth: 1239,
    naturalHeight: 405,
    maxScale: 1,
    html: `        <div style="position:absolute;top:0;left:0;transform:scale(.44);transform-origin:top left;display:flex;align-items:flex-end;gap:48px">

          <!-- 4.3in -->
          <div style="width:max-content;padding:16px;background:#0b0d11;border:1px solid #23262c;border-radius:14px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0 4px 10px">
              <div style="display:flex;align-items:center;gap:8px"><span style="width:7px;height:7px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:9.5px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD</span></div>
              <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:9.5px;letter-spacing:.1em;color:#4a5361">4.3-INCH · 480 × 270</span>
            </div>
            <div data-screen-label="HMI_HOME_TILES_43" style="width:480px;height:270px;background:#0E1217;border:1px solid #000;border-radius:4px;overflow:hidden;display:flex;flex-direction:column;position:relative">
              <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 4px;background:#141922;border-bottom:1px solid #2A313D">
                <div style="display:flex;align-items:center;gap:2px"><span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:16px;color:#F3F6FA;padding-left:5px">Home</span></div>
                <div style="display:flex;align-items:center;gap:0"><span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span><span title="Tile view · active" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#2E9BE6;border-radius:6px;position:relative"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg><span style="position:absolute;left:9px;right:9px;bottom:4px;height:2px;border-radius:2px;background:#2E9BE6"></span></span></div>
              </div>
              <div style="flex:1;padding:11px 12px;display:flex;gap:10px;min-height:0;background:#0E1217">
                <div style="width:214px;flex:none;background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:11px 13px;display:flex;flex-direction:column">
                  <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Discharge Press.</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></div>
                  <div style="flex:1;display:flex;flex-direction:column;justify-content:center"><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:62px;line-height:.85;color:#F3F6FA;letter-spacing:-.02em">102</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:15px;color:#8892A0">PSI</span></div></div>
                  <div style="display:flex;align-items:center;gap:6px;padding-top:8px;border-top:1px solid #232b36"><span style="width:5px;height:5px;border-radius:50%;background:#2FBF71;flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:9px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Protected primary</span></div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;gap:10px;min-width:0">
                  <div style="flex:1;background:#151b24;border:1px solid #2A313D;border-left:4px solid #F5A623;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;justify-content:space-between">
                    <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Airend Temp</span><svg width="17" height="17" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#151b24" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#151b24" stroke-width="2.1" stroke-linecap="round"/></svg></div>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:34px;line-height:.85;color:#F3F6FA">221</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">°F</span><span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:9px;letter-spacing:.06em;color:#F5A623;text-transform:uppercase">Approaching limit</span></div>
                  </div>
                  <div style="flex:1;background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:9px 12px;display:flex;flex-direction:column;justify-content:space-between">
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">% Capacity</span>
                    <div style="display:flex;align-items:baseline;gap:5px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:34px;line-height:.85;color:#F3F6FA">78</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:12px;color:#8892A0">%</span><span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:9px;letter-spacing:.06em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                  </div>
                </div>
              </div>
              <div style="height:34px;flex:none;display:flex;align-items:center;gap:9px;padding:0 12px;background:#212834;border-top:1px solid #2A313D;border-left:4px solid #F5A623">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#212834" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#212834" stroke-width="2.1" stroke-linecap="round"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.02em;color:#F5A623">HIGH AIREND DISCHARGE TEMP</span>
                <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#7a6a45">W.04</span>
              </div>
            </div>
          </div>

          <!-- 7in -->
          <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
              <div style="display:flex;align-items:center;gap:9px"><span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span></div>
              <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
            </div>
            <div data-screen-label="HMI_HOME_STATEFIRST_7 · 7in" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">
              <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
                <div style="display:flex;align-items:center;gap:2px"><span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Home</span></div>
                <div style="display:flex;align-items:center;gap:0"><span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span><span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div><span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span><span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span><span title="Tile view · active" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#2E9BE6;border-radius:6px;position:relative"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg><span style="position:absolute;left:9px;right:9px;bottom:5px;height:2px;border-radius:2px;background:#2E9BE6"></span></span></div>
              </div>
              <div style="flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:14px;background:#0E1217;min-height:0">
                <div style="flex:none;height:62px;display:flex;align-items:center;gap:15px;padding:0 12px 0 16px;background:#241d10;border:1px solid #4a3a17;border-left:5px solid #F5A623;border-radius:7px;text-align:left;width:100%">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#241d10" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#241d10" stroke-width="2.2" stroke-linecap="round"/></svg>
                  <div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:3px"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:18px;letter-spacing:.01em;color:#F5A623;line-height:1.05">HIGH AIREND DISCHARGE TEMP</span><span style="font-family:'IBM Plex Sans';font-weight:400;font-size:12.5px;color:#c9a86a">Approaching trip limit · <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;color:#e0c184">221 °F</span> and rising</span></div>
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;color:#c9a86a;flex:none">W.04</span>
                  <span style="flex:none;display:inline-flex;align-items:center;gap:7px;height:44px;padding:0 15px;background:#14344A;border:1px solid #1F6FAF;border-radius:6px"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;letter-spacing:.06em;color:#57B0EC">VIEW</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#57B0EC" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></span>
                </div>
                <div style="flex:1;display:flex;gap:12px;min-height:0">
                  <div style="width:246px;flex:none;background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:15px 17px;display:flex;flex-direction:column">
                    <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Discharge Pressure</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></div>
                    <div style="flex:1;display:flex;flex-direction:column;justify-content:center"><div style="display:flex;align-items:baseline;gap:9px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:72px;line-height:.9;color:#F3F6FA;letter-spacing:-.02em">102</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:18px;color:#8892A0">PSI</span></div></div>
                    <div style="display:flex;align-items:center;gap:7px;padding-top:11px;border-top:1px solid #232b36"><span style="width:6px;height:6px;border-radius:50%;background:#2FBF71;flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">Protected primary · locked</span></div>
                  </div>
                  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:12px;min-width:0">
                    <div style="background:#151b24;border:1px solid #2A313D;border-left:4px solid #F5A623;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column"><div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Airend Temp</span><svg width="19" height="19" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#151b24" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#151b24" stroke-width="2.1" stroke-linecap="round"/></svg></div><div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">221</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">°F</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:10px;letter-spacing:.09em;color:#F5A623;text-transform:uppercase">Approaching limit</span></div>
                    <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">% Capacity</span><div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">78</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">%</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                    <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Current</span><div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">112</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">A</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                    <div style="background:#151b24;border:1px solid #2A313D;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:11.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Running Hours</span><div style="flex:1;display:flex;align-items:center;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:40px;line-height:.9;color:#F3F6FA">12,480</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:14px;color:#8892A0">h</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.09em;color:#6D7887;text-transform:uppercase">Total runtime</span></div>
                  </div>
                </div>
              </div>
              <div style="height:44px;flex:none;display:flex;align-items:center;gap:12px;padding:0 16px;background:#212834;border-top:1px solid #2A313D;border-left:5px solid #F5A623">
                <span style="display:flex;align-items:center;gap:11px"><svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#212834" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#212834" stroke-width="2.1" stroke-linecap="round"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#F5A623">HIGH AIREND DISCHARGE TEMP</span></span>
                <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#7a6a45">W.04</span>
              </div>
              <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg><span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span></div>
                <div style="display:flex;align-items:center;gap:1px"><span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span></span><div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div><span title="Motor status · running" style="width:48px;height:48px;display:grid;place-items:center;color:#2FBF71"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="animation:hmi-spin 2.8s linear infinite;transform-origin:50% 50%"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span><span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span></div>
              </div>
            </div>
          </div>

          <!-- 10in -->
          <div style="width:max-content;padding:18px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 18px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
              <div style="display:flex;align-items:center;gap:9px"><span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2 · Utilities Room</span></div>
              <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#4a5361">10-INCH · 1280 × 800</span>
            </div>
            <div data-screen-label="HMI_HOME_TILES_10" style="width:1280px;height:800px;background:#0E1217;border:1px solid #000;border-radius:6px;overflow:hidden;display:flex;flex-direction:column;position:relative">
              <div style="height:60px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 10px;background:#141922;border-bottom:1px solid #2A313D">
                <div style="display:flex;align-items:center;gap:4px"><span style="width:56px;height:56px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:26px;color:#F3F6FA;padding-left:10px;letter-spacing:.01em">Home</span></div>
                <div style="display:flex;align-items:center;gap:0"><span title="Help" style="width:56px;height:56px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span><span title="Lock" style="width:56px;height:56px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><div style="width:1px;height:30px;background:#2A313D;margin:0 7px"></div><span title="Schematic view" style="width:56px;height:56px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span><span title="List view" style="width:56px;height:56px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span><span title="Tile view · active" style="width:56px;height:56px;display:grid;place-items:center;background:transparent;border:none;color:#2E9BE6;border-radius:7px;position:relative"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg><span style="position:absolute;left:11px;right:11px;bottom:6px;height:2px;border-radius:2px;background:#2E9BE6"></span></span></div>
              </div>
              <div style="flex:1;padding:20px;display:flex;gap:20px;min-height:0;background:#0E1217">
                <div style="width:400px;flex:none;background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:24px 26px;display:flex;flex-direction:column">
                  <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:16px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Discharge Pressure</span><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></div>
                  <div style="flex:1;display:flex;flex-direction:column;justify-content:center"><div style="display:flex;align-items:baseline;gap:14px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:150px;line-height:.82;color:#F3F6FA;letter-spacing:-.03em">102</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:28px;color:#8892A0">PSI</span></div></div>
                  <div style="display:flex;align-items:center;gap:9px;padding-top:16px;border-top:1px solid #232b36"><span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:12px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">Protected primary · locked</span></div>
                </div>
                <div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:16px;min-width:0">
                  <div style="background:#151b24;border:1px solid #2A313D;border-left:5px solid #F5A623;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><div style="display:flex;align-items:center;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Airend Temp</span><svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#151b24" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#151b24" stroke-width="2.1" stroke-linecap="round"/></svg></div><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">221</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">°F</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.08em;color:#F5A623;text-transform:uppercase">Approaching limit</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">% Capacity</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">78</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">%</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Motor Current</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">112</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">A</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Motor Power</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">74</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">kW</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Coolant Temp</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">176</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">°F</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">DC Bus Voltage</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">648</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">V</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Within limits</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Loaded Hours</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">9,240</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">h</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Total loaded</span></div>
                  <div style="background:#151b24;border:1px solid #2A313D;border-radius:10px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.04em;text-transform:uppercase;color:#8892A0">Daily Energy</span><div style="display:flex;align-items:baseline;gap:6px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:52px;line-height:.85;color:#F3F6FA">641</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:17px;color:#8892A0">kWh</span></div><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#6D7887;text-transform:uppercase">Today</span></div>
                </div>
              </div>
              <div style="height:52px;flex:none;display:flex;align-items:center;gap:14px;padding:0 20px;background:#212834;border-top:1px solid #2A313D;border-left:6px solid #F5A623">
                <span style="display:flex;align-items:center;gap:13px"><svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#212834" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#212834" stroke-width="2.1" stroke-linecap="round"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:18px;letter-spacing:.02em;color:#F5A623">HIGH AIREND DISCHARGE TEMP</span></span>
                <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;letter-spacing:.12em;color:#7a6a45;text-transform:uppercase">W.04 · Warning</span>
              </div>
              <div style="height:56px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 10px 0 20px;background:#141922;border-top:1px solid #2A313D">
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:16px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                <div style="display:flex;align-items:center;gap:11px;padding:7px 14px;background:#0b0d11;border:1px solid #23272c;border-radius:6px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg><span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span></div>
                <div style="display:flex;align-items:center;gap:2px"><span style="height:48px;padding:0 15px;display:inline-flex;align-items:center;gap:10px;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:15px;color:#A6B0BE">Operator</span></span><div style="width:1px;height:28px;background:#2A313D;margin:0 6px"></div><span title="Motor status · running" style="width:52px;height:52px;display:grid;place-items:center;color:#2FBF71"><svg width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="animation:hmi-spin 2.8s linear infinite;transform-origin:50% 50%"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span><span title="Lock screen" style="width:52px;height:52px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><span title="Communication control" style="width:52px;height:52px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:7px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span></div>
              </div>
            </div>
          </div>

        </div>
      `,
  },
  alarmPair: {
    naturalWidth: 1158,
    naturalHeight: 415,
    maxScale: 1,
    html: `        <div style="position:absolute;top:0;left:0;transform:scale(.66);transform-origin:top left;display:flex;gap:40px;align-items:flex-start">

          <!-- RUNNING -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div style="font-family:'Source Code Pro',monospace;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#cbc8bf">Active alarms · caught early</div>
            <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
                <div style="display:flex;align-items:center;gap:9px"><span style="width:8px;height:8px;border-radius:50%;background:#2FBF71;box-shadow:0 0 6px rgba(47,191,113,.7);flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span></div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
              </div>
              <div data-screen-label="HMI_ALARM_ACTIVE_7 · running" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">
                <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
                  <div style="display:flex;align-items:center;gap:2px"><span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Active Alarms</span></div>
                  <div style="display:flex;align-items:center;gap:0"><span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span><span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div><span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span><span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span><span title="Tile view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg></span></div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;min-height:0;background:#0E1217">
                  <div style="height:66px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid #20262f;background:#12161d">
                    <div style="display:flex;align-items:center;gap:14px">
                      <div style="display:flex;align-items:baseline;gap:7px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:26px;color:#F3F6FA">2</span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12px;letter-spacing:.08em;color:#8892A0;text-transform:uppercase">Active</span></div>
                      <span style="display:inline-flex;align-items:center;gap:7px;padding:5px 11px;background:#241d10;border:1px solid #4a3a17;border-radius:5px"><svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12px;letter-spacing:.05em;color:#c9a86a">2 WARNINGS</span></span>
                    </div>
                    <span style="min-height:56px;padding:0 22px;display:inline-flex;align-items:center;gap:10px;background:#14344A;color:#57B0EC;border:1px solid #1F6FAF;border-radius:6px;font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.05em"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 1 2.4 5.9"/><path d="M3.2 19v-4.2h4.2"/></svg>RESET ALL</span>
                  </div>
                  <div style="flex:1;overflow-y:auto;min-height:0">
                    <div>
                      <div style="display:flex;align-items:center;gap:13px;height:58px;width:100%;padding:0 8px 0 13px;background:transparent;border-left:3px solid transparent;border-bottom:1px solid #20262f;text-align:left">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#0E1217" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#0E1217" stroke-width="2.1" stroke-linecap="round"/></svg>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;color:#F5A623;width:50px;flex:none">W.03</span>
                        <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:15px;color:#F3F6FA;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Service Due — Separator Element</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:400;font-size:12.5px;color:#8892A0;flex:none">2024-05-15</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:13px;color:#A6B0BE;width:64px;text-align:right;flex:none">08:15:04</span>
                        <span style="width:48px;height:48px;display:grid;place-items:center;color:#2E9BE6;flex:none"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v4.6"/><path d="M12 8.3h.01" stroke-width="2.1"/></svg></span>
                      </div>
                      <div style="display:flex;align-items:center;gap:13px;height:58px;width:100%;padding:0 8px 0 13px;background:#14344A;border-left:3px solid #2E9BE6;border-bottom:1px solid #20262f;text-align:left">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#14344A" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#14344A" stroke-width="2.1" stroke-linecap="round"/></svg>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;color:#F5A623;width:50px;flex:none">W.04</span>
                        <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:15px;color:#F3F6FA;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">High Airend Discharge Temperature (approaching limit)</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:400;font-size:12.5px;color:#8892A0;flex:none">2024-05-15</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:13px;color:#F3F6FA;width:64px;text-align:right;flex:none">14:29:41</span>
                        <span style="width:48px;height:48px;display:grid;place-items:center;color:#57B0EC;flex:none"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v4.6"/><path d="M12 8.3h.01" stroke-width="2.1"/></svg></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="height:44px;flex:none;display:flex;align-items:center;gap:12px;padding:0 16px;background:#212834;border-top:1px solid #2A313D;border-left:5px solid #F5A623">
                  <span style="display:flex;align-items:center;gap:12px"><span style="width:9px;height:9px;border-radius:50%;background:#2FBF71;flex:none;animation:hmi-pulse 2.4s ease-in-out infinite"></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#2FBF71">RUNNING — LOADED</span></span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#7a6a45">W.04</span>
                </div>
                <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                  <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg><span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span></div>
                  <div style="display:flex;align-items:center;gap:1px"><span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span></span><div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div><span title="Motor status · running" style="width:48px;height:48px;display:grid;place-items:center;color:#2FBF71"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" style="animation:hmi-spin 2.8s linear infinite;transform-origin:50% 50%"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span><span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span></div>
                </div>
              </div>
            </div>
          </div>

          <!-- TRIPPED -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:16px">
            <div style="font-family:'Source Code Pro',monospace;font-size:18px;letter-spacing:.12em;text-transform:uppercase;color:#cbc8bf">Active alarms · after the trip</div>
            <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
              <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
                <div style="display:flex;align-items:center;gap:9px"><span style="width:8px;height:8px;border-radius:50%;background:#E5484D;box-shadow:0 0 6px rgba(229,72,77,.7);flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span></div>
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
              </div>
              <div data-screen-label="HMI_ALARM_ACTIVE_7 · tripped" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">
                <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
                  <div style="display:flex;align-items:center;gap:2px"><span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Active Alarms</span></div>
                  <div style="display:flex;align-items:center;gap:0"><span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span><span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div><span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span><span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span><span title="Tile view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg></span></div>
                </div>
                <div style="flex:1;display:flex;flex-direction:column;min-height:0;background:#0E1217">
                  <div style="height:66px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 16px;border-bottom:1px solid #20262f;background:#12161d">
                    <div style="display:flex;align-items:center;gap:12px">
                      <div style="display:flex;align-items:baseline;gap:7px"><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:26px;color:#F3F6FA">3</span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12px;letter-spacing:.08em;color:#8892A0;text-transform:uppercase">Active</span></div>
                      <span style="display:inline-flex;align-items:center;gap:7px;padding:5px 11px;background:#2a1113;border:1px solid #5a2023;border-radius:5px"><svg width="14" height="14" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12px;letter-spacing:.05em;color:#d98a8c">1 TRIP</span></span>
                      <span style="display:inline-flex;align-items:center;gap:7px;padding:5px 11px;background:#241d10;border:1px solid #4a3a17;border-radius:5px"><svg width="14" height="14" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:12px;letter-spacing:.05em;color:#c9a86a">2 WARNINGS</span></span>
                    </div>
                    <span style="min-height:56px;padding:0 22px;display:inline-flex;align-items:center;gap:10px;background:#14344A;color:#57B0EC;border:1px solid #1F6FAF;border-radius:6px;font-family:'IBM Plex Sans';font-weight:600;font-size:14px;letter-spacing:.05em"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12a8.5 8.5 0 1 1 2.4 5.9"/><path d="M3.2 19v-4.2h4.2"/></svg>RESET ALL</span>
                  </div>
                  <div style="flex:1;overflow-y:auto;min-height:0">
                    <div>
                      <div style="display:flex;align-items:center;gap:13px;height:58px;width:100%;padding:0 8px 0 13px;background:transparent;border-left:3px solid transparent;border-bottom:1px solid #20262f;text-align:left">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#0E1217" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#0E1217" stroke-width="2.1" stroke-linecap="round"/></svg>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;color:#F5A623;width:50px;flex:none">W.03</span>
                        <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:15px;color:#F3F6FA;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">Service Due — Separator Element</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:400;font-size:12.5px;color:#8892A0;flex:none">2024-05-15</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:13px;color:#A6B0BE;width:64px;text-align:right;flex:none">08:15:04</span>
                        <span style="width:48px;height:48px;display:grid;place-items:center;color:#2E9BE6;flex:none"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v4.6"/><path d="M12 8.3h.01" stroke-width="2.1"/></svg></span>
                      </div>
                      <div style="display:flex;align-items:center;gap:13px;height:58px;width:100%;padding:0 8px 0 13px;background:transparent;border-left:3px solid transparent;border-bottom:1px solid #20262f;text-align:left">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#0E1217" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#0E1217" stroke-width="2.1" stroke-linecap="round"/></svg>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;color:#F5A623;width:50px;flex:none">W.04</span>
                        <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:15px;color:#F3F6FA;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">High Airend Discharge Temperature (approaching limit)</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:400;font-size:12.5px;color:#8892A0;flex:none">2024-05-15</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:13px;color:#A6B0BE;width:64px;text-align:right;flex:none">14:29:41</span>
                        <span style="width:48px;height:48px;display:grid;place-items:center;color:#2E9BE6;flex:none"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v4.6"/><path d="M12 8.3h.01" stroke-width="2.1"/></svg></span>
                      </div>
                      <div style="display:flex;align-items:center;gap:13px;height:58px;width:100%;padding:0 8px 0 13px;background:#14344A;border-left:3px solid #2E9BE6;border-bottom:1px solid #20262f;text-align:left">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#fff" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#fff" stroke-width="2.1" stroke-linecap="round"/></svg>
                        <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:17px;color:#E5484D;width:50px;flex:none">T.01</span>
                        <span style="font-family:'IBM Plex Sans';font-weight:400;font-size:15px;color:#F3F6FA;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">High Airend Discharge Temperature — Trip</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:400;font-size:12.5px;color:#8892A0;flex:none">2024-05-15</span>
                        <span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:13px;color:#F3F6FA;width:64px;text-align:right;flex:none">14:32:07</span>
                        <span style="width:48px;height:48px;display:grid;place-items:center;color:#57B0EC;flex:none"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M12 11.2v4.6"/><path d="M12 8.3h.01" stroke-width="2.1"/></svg></span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="height:44px;flex:none;display:flex;align-items:center;gap:12px;padding:0 16px;background:#241417;border-top:1px solid #2A313D;border-left:5px solid #E5484D">
                  <span style="display:flex;align-items:center;gap:11px"><svg width="20" height="20" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#241417" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#241417" stroke-width="2.1" stroke-linecap="round"/></svg><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#E5484D">TRIPPED — STOPPED</span></span>
                  <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#8a5052">T.01</span>
                </div>
                <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                  <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg><span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span></div>
                  <div style="display:flex;align-items:center;gap:1px"><span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span></span><div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div><span title="Motor status · stopped" style="width:48px;height:48px;display:grid;place-items:center;color:#6D7887"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span><span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      `,
  },
  alarmInfo: {
    naturalWidth: 844,
    naturalHeight: 560,
    maxScale: 1.0,
    html: `        <div style="position:absolute;top:0;left:0;transform-origin:top left">
          <div style="width:max-content;padding:20px;background:#0b0d11;border:1px solid #23262c;border-radius:16px;box-shadow:0 2px 14px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.03)">
            <div style="display:flex;justify-content:space-between;align-items:center;padding:0 6px 12px">
              <div style="display:flex;align-items:center;gap:9px"><span style="width:8px;height:8px;border-radius:50%;background:#E5484D;box-shadow:0 0 6px rgba(229,72,77,.7);flex:none"></span><span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.14em;color:#8892A0;text-transform:uppercase">Atlas · AC-90 VSD · Line 2</span></div>
              <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:10px;letter-spacing:.1em;color:#4a5361">7-INCH · 800 × 480</span>
            </div>
            <div data-screen-label="HMI_ALARM_INFO_7" style="width:800px;height:480px;background:#0E1217;border:1px solid #000;border-radius:5px;overflow:hidden;display:flex;flex-direction:column;position:relative">
              <div style="height:52px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px;background:#141922;border-bottom:1px solid #2A313D">
                <div style="display:flex;align-items:center;gap:2px"><span style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:20px;color:#F3F6FA;padding-left:8px;letter-spacing:.01em">Active Alarms</span></div>
                <div style="display:flex;align-items:center;gap:0"><span title="Help" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.4"/><path d="M9.7 9.5a2.35 2.35 0 1 1 3.1 2.23c-.62.25-1 .74-1 1.4v.45"/><path d="M12 16.5h.01" stroke-width="2.1"/></svg></span><span title="Lock" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><div style="width:1px;height:26px;background:#2A313D;margin:0 5px"></div><span title="Schematic view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.4" y="9.2" width="6" height="5.6" rx="1.2"/><circle cx="17" cy="12" r="3.1"/><path d="M9.4 12h4.5M17 8.9V6.4M17 15.1v2.5"/></svg></span><span title="List view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7h10.5M9 12h10.5M9 17h10.5"/><path d="M5 7h.01M5 12h.01M5 17h.01" stroke-width="2.3"/></svg></span><span title="Tile view" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/></svg></span></div>
              </div>
              <div style="flex:1;position:relative;background:#0E1217;min-height:0;overflow:hidden">
                <div style="position:absolute;inset:0;opacity:.32;filter:saturate(.7)">
                  <div style="display:flex;align-items:center;gap:12px;height:58px;padding:0 13px;border-bottom:1px solid #20262f"><svg width="22" height="22" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#F5A623">W.03</span><span style="font-family:'IBM Plex Sans';font-size:14px;color:#F3F6FA">Service Due — Separator Element</span></div>
                  <div style="display:flex;align-items:center;gap:12px;height:58px;padding:0 13px;border-bottom:1px solid #20262f"><svg width="22" height="22" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#F5A623">W.04</span><span style="font-family:'IBM Plex Sans';font-size:14px;color:#F3F6FA">High Airend Discharge Temperature</span></div>
                  <div style="display:flex;align-items:center;gap:12px;height:58px;padding:0 13px;border-bottom:1px solid #20262f;border-left:3px solid #2E9BE6;background:#14344A"><svg width="22" height="22" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:16px;color:#E5484D">T.01</span><span style="font-family:'IBM Plex Sans';font-size:14px;color:#F3F6FA">High Airend Discharge Temperature — Trip</span></div>
                </div>
                <div style="position:absolute;inset:0;background:rgba(8,10,14,.6)"></div>
                <div style="position:absolute;top:0;right:0;bottom:0;width:534px;background:#12161d;border-left:1px solid #2A313D;box-shadow:-8px 0 24px rgba(0,0,0,.5);display:flex;flex-direction:column">
                  <div style="height:52px;flex:none;display:flex;align-items:center;gap:6px;padding:0 12px;border-bottom:1px solid #23272f">
                    <span style="width:48px;height:48px;display:grid;place-items:center;color:#57B0EC"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg></span>
                    <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:17px;color:#F3F6FA">Alarm Info</span>
                    <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">Snapshot at trip</span>
                  </div>
                  <div style="flex:none;display:flex;align-items:center;gap:12px;padding:12px 16px;background:#1c1214;border-bottom:1px solid #3a2023">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.3" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#1c1214" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#1c1214" stroke-width="2.2" stroke-linecap="round"/></svg>
                    <div style="flex:1;min-width:0"><div style="display:flex;align-items:baseline;gap:9px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:16px;color:#E5484D">T.01</span><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;color:#F3F6FA">High Airend Discharge Temperature — Trip</span></div><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-size:11.5px;letter-spacing:.04em;color:#8892A0">2024-05-15 · 14:32:07</span></div>
                  </div>
                  <div style="flex:1;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;min-height:0">
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-right:1px solid #20262f;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Operating State</span><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#F3F6FA">Running — Loaded</span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Current</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">118</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">A</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-right:1px solid #20262f;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Total Hours</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">12,480</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">h</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Speed</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">3,050</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">RPM</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-right:1px solid #20262f;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Loaded Hours</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">9,240</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">h</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Motor Power</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">78</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">kW</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-right:1px solid #20262f;border-bottom:1px solid #20262f;border-left:3px solid #E5484D;background:#1a1113"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#d98a8c">Airend Temp</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:600;font-size:16px;color:#E5484D">228</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#d98a8c">°F</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">DC Bus Voltage</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">651</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">V</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-right:1px solid #20262f;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Discharge Press.</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">104</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">PSI</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-bottom:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Heatsink Temp</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">128</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">°F</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-right:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#8892A0">Percent Capacity</span><span><span style="font-family:'IBM Plex Mono',monospace;font-variant-numeric:tabular-nums;font-weight:500;font-size:16px;color:#F3F6FA">81</span> <span style="font-family:'IBM Plex Sans';font-size:11px;color:#8892A0">%</span></span></div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 14px;border-left:3px solid #E5484D;background:#1a1113"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:10.5px;letter-spacing:.05em;text-transform:uppercase;color:#d98a8c">Fault Code</span><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:16px;color:#E5484D">T.01</span></div>
                  </div>
                </div>
              </div>
              <div style="height:44px;flex:none;display:flex;align-items:center;gap:11px;padding:0 16px;background:#241417;border-top:1px solid #2A313D;border-left:5px solid #E5484D">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.1" stroke="#241417" stroke-linecap="round" stroke-width="1.9"/><path d="M12 16.5h.01" stroke="#241417" stroke-width="2.1" stroke-linecap="round"/></svg>
                <span style="font-family:'IBM Plex Sans';font-weight:600;font-size:15px;letter-spacing:.02em;color:#E5484D">TRIPPED — STOPPED</span>
                <span style="margin-left:auto;font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.1em;color:#8a5052">T.01</span>
              </div>
              <div style="height:48px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:0 8px 0 14px;background:#141922;border-top:1px solid #2A313D">
                <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:13px;font-variant-numeric:tabular-nums;letter-spacing:.02em;color:#A6B0BE">15 May 2024 · 02:32 PM</span>
                <div style="display:flex;align-items:center;gap:9px;padding:5px 11px;background:#0b0d11;border:1px solid #23272c;border-radius:5px"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#C4CCD6" stroke-width="1.7" stroke-linejoin="round"><path d="M12 2.6 20.5 7.3v9.4L12 21.4 3.5 16.7V7.3z"/><path d="M9 14.5 12 8l3 6.5" stroke="#8892A0"/></svg><span style="font-family:'IBM Plex Sans Condensed','IBM Plex Sans';font-weight:600;font-size:12.5px;letter-spacing:.1em;color:#A6B0BE">ATLAS AIR SYSTEMS</span></div>
                <div style="display:flex;align-items:center;gap:1px"><span style="height:40px;padding:0 12px;display:inline-flex;align-items:center;gap:8px;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8.4" r="3.3"/><path d="M5.6 19.4a6.4 6.4 0 0 1 12.8 0"/></svg><span style="font-family:'IBM Plex Sans';font-weight:500;font-size:13px;color:#A6B0BE">Operator</span></span><div style="width:1px;height:24px;background:#2A313D;margin:0 4px"></div><span title="Motor status · stopped" style="width:48px;height:48px;display:grid;place-items:center;color:#6D7887"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/></svg></span><span title="Lock screen" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></span><span title="Communication control" style="width:48px;height:48px;display:grid;place-items:center;background:transparent;border:none;color:#A6B0BE;border-radius:6px"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="15.5" r="1.5" fill="currentColor" stroke="none"/><path d="M8.6 12.9a5 5 0 0 1 6.8 0M6.1 10.3a8.6 8.6 0 0 1 11.8 0"/></svg></span></div>
              </div>
            </div>
          </div>
        </div>
      `,
  },
  diagramTaxonomy: {
    naturalWidth: 1120,
    naturalHeight: null,
    maxScale: 1,
    html: `    <div style="display:flex;justify-content:center;margin:28px 0 0">
      <div data-screen-label="HMI_DGM_ALARMTAXONOMY" style="width:1120px;max-width:100%;background:#0d1016;border:1px solid #23262c;border-radius:14px;overflow:hidden">
        <div style="padding:28px 34px 24px;border-bottom:1px solid #20262f">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap">
            <div>
              <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.22em;color:#2E9BE6;text-transform:uppercase;margin-bottom:10px">AC-Series HMI · Receipt Diagram</div>
              <h1 style="margin:0;font-family:'IBM Plex Sans';font-weight:600;font-size:28px;letter-spacing:-.01em;color:#F3F6FA">Alarm Taxonomy — Trip vs Warning</h1>
              <p style="margin:9px 0 0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#A6B0BE;max-width:680px">Two severities, one visual grammar. What triggers each, what the machine does in response, and how the operator tells them apart at a glance.</p>
            </div>
            <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#3A4352;text-transform:uppercase;white-space:nowrap">HMI_DGM_ALARMTAXONOMY</div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:176px 1fr 1fr">
          <div style="border-bottom:1px solid #20262f"></div>
          <div style="padding:22px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#150e0f">
            <div style="display:flex;align-items:center;gap:14px">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.2" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.3" stroke="#fff" stroke-linecap="round" stroke-width="1.8"/><path d="M12 16.8h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
              <div><div style="font-family:'IBM Plex Sans';font-weight:700;font-size:24px;letter-spacing:.02em;color:#E5484D">TRIP</div><div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.06em;color:#a86b6d;margin-top:3px">Codes · T · P · M · S · IO · E</div></div>
            </div>
          </div>
          <div style="padding:22px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#171205">
            <div style="display:flex;align-items:center;gap:14px">
              <svg width="52" height="52" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.2" stroke-linejoin="round" style="flex:none"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.3" stroke="#150e00" stroke-linecap="round" stroke-width="1.8"/><path d="M12 16.8h.01" stroke="#150e00" stroke-width="2" stroke-linecap="round"/></svg>
              <div><div style="font-family:'IBM Plex Sans';font-weight:700;font-size:24px;letter-spacing:.02em;color:#F5A623">WARNING</div><div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.06em;color:#b0904f;margin-top:3px">Codes · W</div></div>
            </div>
          </div>
          <div style="padding:20px 22px;border-bottom:1px solid #20262f;display:flex;align-items:flex-start"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">What triggers it</span></div>
          <div style="padding:20px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#120c0d"><p style="margin:0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#D6DCE4">A protective limit is exceeded — high airend temperature, high discharge pressure, motor overload, a power / supply fault, or an E-stop.</p></div>
          <div style="padding:20px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#141003"><p style="margin:0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#D6DCE4">A service interval is reached or a subsystem is degrading — air filter, separator, coolant — or a value is <span style="color:#e0c184">approaching</span> its trip limit.</p></div>
          <div style="padding:20px 22px;border-bottom:1px solid #20262f;display:flex;align-items:flex-start"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">What the machine does</span></div>
          <div style="padding:20px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#120c0d"><p style="margin:0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#D6DCE4"><span style="color:#E5484D;font-weight:600">Stops the compressor</span> immediately, or blocks a start. The fault must be physically cleared before restart.</p></div>
          <div style="padding:20px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#141003"><p style="margin:0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#D6DCE4"><span style="color:#F5A623;font-weight:600">Keeps running.</span> Surfaces the condition so it can be serviced on schedule — before it becomes a trip.</p></div>
          <div style="padding:20px 22px;border-bottom:1px solid #20262f;display:flex;align-items:flex-start"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">How it presents</span></div>
          <div style="padding:20px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#120c0d"><p style="margin:0 0 12px;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#D6DCE4">Red status strip · pinned to the top of the active-alarm list.</p><div style="display:flex;align-items:center;gap:16px"><div style="display:flex;align-items:center;gap:7px"><svg width="18" height="18" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#a86b6d">active</span></div><div style="display:flex;align-items:center;gap:7px;opacity:.55"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6D7887">cleared</span></div></div></div>
          <div style="padding:20px 26px;border-bottom:1px solid #20262f;border-left:1px solid #20262f;background:#141003"><p style="margin:0 0 12px;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#D6DCE4">Amber status strip · listed beneath any trips.</p><div style="display:flex;align-items:center;gap:16px"><div style="display:flex;align-items:center;gap:7px"><svg width="18" height="18" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#b0904f">active</span></div><div style="display:flex;align-items:center;gap:7px;opacity:.55"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6D7887" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><span style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:#6D7887">acknowledged</span></div></div></div>
          <div style="padding:20px 22px;display:flex;align-items:flex-start"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.1em;color:#6D7887;text-transform:uppercase">Examples</span></div>
          <div style="padding:18px 26px;border-left:1px solid #20262f;background:#120c0d;display:flex;flex-direction:column;gap:9px">
            <div style="display:flex;align-items:center;gap:11px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:14px;color:#E5484D;width:44px">T.01</span><span style="font-family:'IBM Plex Sans';font-size:13.5px;color:#D6DCE4">High Airend Discharge Temperature</span></div>
            <div style="display:flex;align-items:center;gap:11px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:14px;color:#E5484D;width:44px">P.01</span><span style="font-family:'IBM Plex Sans';font-size:13.5px;color:#D6DCE4">Power Failure / Restart Over-Run</span></div>
          </div>
          <div style="padding:18px 26px;border-left:1px solid #20262f;background:#141003;display:flex;flex-direction:column;gap:9px">
            <div style="display:flex;align-items:center;gap:11px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:14px;color:#F5A623;width:44px">W.03</span><span style="font-family:'IBM Plex Sans';font-size:13.5px;color:#D6DCE4">Service Due — Separator Element</span></div>
            <div style="display:flex;align-items:center;gap:11px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:14px;color:#F5A623;width:44px">W.04</span><span style="font-family:'IBM Plex Sans';font-size:13.5px;color:#D6DCE4">High Airend Discharge Temp (approaching)</span></div>
          </div>
        </div>
        <div style="padding:22px 34px;background:#0b0e13;border-top:1px solid #20262f;display:flex;align-items:center;gap:22px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:12px;flex:none">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#E5484D" stroke="#E5484D" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.3" stroke="#fff" stroke-linecap="round" stroke-width="1.8"/><path d="M12 16.8h.01" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/><path d="M12 9.6v4.3" stroke="#150e00" stroke-linecap="round" stroke-width="1.8"/><path d="M12 16.8h.01" stroke="#150e00" stroke-width="2" stroke-linecap="round"/></svg>
          </div>
          <p style="margin:0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#A6B0BE;flex:1;min-width:280px"><span style="color:#F3F6FA;font-weight:600">The rule:</span> both severities share the same triangle — they are distinguished by <span style="color:#F3F6FA">fill colour</span>, the <span style="font-family:'IBM Plex Mono',monospace;color:#F3F6FA">code prefix</span> (T/P/M… vs W), and <span style="color:#F3F6FA">list position</span>. Severity is never signalled by colour alone.</p>
        </div>
      </div>
    </div>`,
  },
  diagramTouch: {
    naturalWidth: 1120,
    naturalHeight: null,
    maxScale: 1,
    html: `    <div style="display:flex;justify-content:center;margin:28px 0 0">
      <div data-screen-label="HMI_DGM_TOUCHTARGET" style="width:1120px;max-width:100%;background:#0d1016;border:1px solid #23262c;border-radius:14px;overflow:hidden">
        <div style="padding:28px 34px 24px;border-bottom:1px solid #20262f;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap">
          <div>
            <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.22em;color:#2E9BE6;text-transform:uppercase;margin-bottom:10px">AC-Series HMI · Receipt Diagram</div>
            <h1 style="margin:0;font-family:'IBM Plex Sans';font-weight:600;font-size:28px;letter-spacing:-.01em;color:#F3F6FA">Touch-Target &amp; Ergonomic Spec</h1>
            <p style="margin:9px 0 0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#A6B0BE;max-width:680px">Sized for a gloved hand on a resistive, single-touch panel under work-light glare. Every control clears a hard minimum; safety-critical controls clear a larger one.</p>
          </div>
          <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#3A4352;text-transform:uppercase;white-space:nowrap">HMI_DGM_TOUCHTARGET</div>
        </div>
        <div style="display:grid;grid-template-columns:1.55fr 1fr">
          <div style="padding:34px 30px;border-right:1px solid #20262f;background:#0E1217;position:relative">
            <div style="position:absolute;inset:0;background-image:linear-gradient(#141c26 1px,transparent 1px),linear-gradient(90deg,#141c26 1px,transparent 1px);background-size:28px 28px;opacity:.5"></div>
            <div style="position:relative;margin-bottom:44px">
              <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.12em;color:#6D7887;text-transform:uppercase;margin-bottom:18px">Standard control · minimum</div>
              <div style="display:flex;align-items:flex-end;gap:40px">
                <div style="display:flex;flex-direction:column;align-items:center;gap:9px">
                  <div style="position:relative;width:48px;height:48px">
                    <div style="width:48px;height:48px;display:grid;place-items:center;background:#171C24;border:1px solid #2A313D;border-radius:8px;color:#A6B0BE"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg></div>
                    <div style="position:absolute;top:-9px;right:-9px;width:56px;height:56px;border:1.5px dashed #2E9BE6;border-radius:50%;opacity:.75"></div>
                  </div>
                  <div style="display:flex;align-items:center;width:48px"><span style="width:1px;height:7px;background:#2E9BE6"></span><span style="flex:1;height:1px;background:#2E9BE6"></span><span style="width:1px;height:7px;background:#2E9BE6"></span></div>
                  <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:13px;color:#57B0EC">48 px</span>
                </div>
                <div style="padding-bottom:6px"><div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:8px"><span style="width:14px;height:14px;border:1.5px dashed #2E9BE6;border-radius:50%"></span><span style="font-family:'IBM Plex Sans';font-size:12.5px;color:#8892A0">gloved fingertip ≈ 16–20 mm contact</span></div><p style="margin:0;font-family:'IBM Plex Sans';font-size:13.5px;line-height:1.55;color:#C4CCD6;max-width:260px">Icons, list rows, menu items, form fields — nothing an operator taps is smaller than <span style="color:#57B0EC;font-family:'IBM Plex Mono',monospace">48 px</span>.</p></div>
              </div>
            </div>
            <div style="position:relative">
              <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.12em;color:#6D7887;text-transform:uppercase;margin-bottom:18px">Safety-critical control · minimum</div>
              <div style="display:flex;align-items:flex-end;gap:24px">
                <div style="display:flex;flex-direction:column;align-items:center;gap:9px">
                  <div style="display:flex;align-items:flex-end;gap:24px">
                    <div style="display:flex;flex-direction:column;align-items:center;gap:9px">
                      <span style="min-height:56px;padding:0 24px;background:#2FBF71;color:#08130c;border:none;border-radius:7px;font-family:'IBM Plex Sans';font-weight:600;font-size:16px;letter-spacing:.06em;display:inline-flex;align-items:center;gap:10px"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z"/></svg>START</span>
                      <div style="display:flex;align-items:center;width:100%"><span style="width:1px;height:7px;background:#2E9BE6"></span><span style="flex:1;height:1px;background:#2E9BE6"></span><span style="width:1px;height:7px;background:#2E9BE6"></span></div>
                      <span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:13px;color:#57B0EC">≥ 56 px tall</span>
                    </div>
                    <div style="display:flex;flex-direction:column;align-items:center;gap:6px;padding-bottom:34px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:12px;color:#57B0EC">≥12</span><div style="display:flex;flex-direction:column;align-items:center"><span style="height:1px;width:7px;background:#2E9BE6"></span><span style="width:1px;height:26px;background:#2E9BE6"></span><span style="height:1px;width:7px;background:#2E9BE6"></span></div></div>
                    <span style="min-height:56px;padding:0 24px;background:#E5484D;color:#fff;border:none;border-radius:7px;font-family:'IBM Plex Sans';font-weight:600;font-size:16px;letter-spacing:.06em;display:inline-flex;align-items:center;gap:10px;margin-bottom:40px"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="7" width="10" height="10" rx="1.5"/></svg>STOP</span>
                  </div>
                </div>
                <div style="padding-bottom:40px"><p style="margin:0;font-family:'IBM Plex Sans';font-size:13.5px;line-height:1.55;color:#C4CCD6;max-width:210px">Start / Stop and alarm actions are <span style="color:#57B0EC;font-family:'IBM Plex Mono',monospace">≥56 px</span>, spaced <span style="color:#57B0EC;font-family:'IBM Plex Mono',monospace">≥12 px</span> apart, and confirm before acting.</p></div>
              </div>
            </div>
          </div>
          <div style="padding:30px 30px;display:flex;flex-direction:column;gap:14px">
            <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.12em;color:#6D7887;text-transform:uppercase">Why the floor is higher</div>
            <div style="display:flex;gap:13px;padding:15px 16px;background:#12161D;border:1px solid #2A313D;border-radius:9px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8892A0" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:1px"><path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0 0V4a1.5 1.5 0 0 1 3 0v6m0 0V5.5a1.5 1.5 0 0 1 3 0V13a6 6 0 0 1-6 6h-1.2a5 5 0 0 1-3.9-1.9L4.5 14.4a1.6 1.6 0 0 1 2.4-2.1L8 13.5"/></svg>
              <div><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;color:#F3F6FA;margin-bottom:4px">Gloved hand</div><p style="margin:0;font-family:'IBM Plex Sans';font-size:12.5px;line-height:1.5;color:#A6B0BE">The contact patch is larger and less precise, so targets start at 48px and never shrink.</p></div>
            </div>
            <div style="display:flex;gap:13px;padding:15px 16px;background:#12161D;border:1px solid #2A313D;border-radius:9px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8892A0" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:1px"><path d="M9 11V6.5a1.6 1.6 0 0 1 3.2 0V11"/><path d="M12.2 11V5.4a1.6 1.6 0 0 1 3.2 0V12a6 6 0 0 1-6 6 5 5 0 0 1-4-2l-1.6-2.2a1.6 1.6 0 0 1 2.5-2l1 1.2"/><circle cx="12" cy="12" r="9.5" stroke-dasharray="2 3" opacity=".5"/></svg>
              <div><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;color:#F3F6FA;margin-bottom:4px">Resistive · single-touch</div><p style="margin:0;font-family:'IBM Plex Sans';font-size:12.5px;line-height:1.5;color:#A6B0BE">One firm press registers. No multi-touch, no swipes or pinches — every action is a discrete tap.</p></div>
            </div>
            <div style="display:flex;gap:13px;padding:15px 16px;background:#12161D;border:1px solid #2A313D;border-radius:9px">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8892A0" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:1px"><circle cx="12" cy="12" r="4"/><path d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/></svg>
              <div><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:14px;color:#F3F6FA;margin-bottom:4px">Glare &amp; vibration</div><p style="margin:0;font-family:'IBM Plex Sans';font-size:12.5px;line-height:1.5;color:#A6B0BE">Lit by work lights, shaken by the compressor. High-contrast fills and wide spacing keep targets findable and hittable.</p></div>
            </div>
          </div>
        </div>
        <div style="padding:22px 34px;background:#0b0e13;border-top:1px solid #20262f;display:flex;align-items:center;gap:26px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:0">
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="width:44px;height:22px;border:1px dashed #3A4352;border-radius:4px"></div><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#4a5361">44 · consumer</span></div>
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" stroke="#3A4352" stroke-width="1.5"><path d="M2 8h20M17 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="width:48px;height:26px;background:#171C24;border:1px solid #2E9BE6;border-radius:5px"></div><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#57B0EC">48 · standard min</span></div>
            <svg width="26" height="16" viewBox="0 0 26 16" fill="none" stroke="#3A4352" stroke-width="1.5"><path d="M2 8h20M17 3l5 5-5 5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px"><div style="width:56px;height:30px;background:#14344A;border:1px solid #2E9BE6;border-radius:5px"></div><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#57B0EC">56 · critical min</span></div>
          </div>
          <p style="margin:0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#A6B0BE;flex:1;min-width:260px"><span style="color:#F3F6FA;font-weight:600">Taps only — no gestures.</span> The interface assumes a single, deliberate press; there is nothing that requires two fingers, a swipe, or a hold.</p>
        </div>
      </div>
    </div>`,
  },
  diagramSizeLogic: {
    naturalWidth: 1120,
    naturalHeight: null,
    maxScale: 1,
    html: `    <div style="display:flex;justify-content:center;margin:28px 0 0">
      <div data-screen-label="HMI_DGM_SIZELOGIC" style="width:1120px;max-width:100%;background:#0d1016;border:1px solid #23262c;border-radius:14px;overflow:hidden">
        <div style="padding:28px 34px 24px;border-bottom:1px solid #20262f;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap">
          <div>
            <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.22em;color:#2E9BE6;text-transform:uppercase;margin-bottom:10px">AC-Series HMI · Receipt Diagram</div>
            <h1 style="margin:0;font-family:'IBM Plex Sans';font-weight:600;font-size:28px;letter-spacing:-.01em;color:#F3F6FA">Three-Size Layout Logic</h1>
            <p style="margin:9px 0 0;font-family:'IBM Plex Sans';font-size:14px;line-height:1.55;color:#A6B0BE;max-width:700px">One interface across three fixed displays. As the screen shrinks the tile count drops — but the rule for <span style="color:#F3F6FA">what</span> drops, and what never does, is fixed.</p>
          </div>
          <div style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:11px;letter-spacing:.08em;color:#3A4352;text-transform:uppercase;white-space:nowrap">HMI_DGM_SIZELOGIC</div>
        </div>
        <div style="padding:34px 34px 28px;display:flex;align-items:flex-end;justify-content:center;gap:42px;border-bottom:1px solid #20262f;flex-wrap:wrap">
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div style="width:200px;height:120px;background:#0E1217;border:1px solid #2A313D;border-radius:5px;overflow:hidden;display:flex;flex-direction:column">
              <div style="height:16px;flex:none;background:#141922;border-bottom:1px solid #2A313D"></div>
              <div style="flex:1;padding:7px;display:flex;gap:6px"><div style="flex:1.1;background:#1b2430;border:1px solid #3A4352;border-radius:4px;display:flex;flex-direction:column;justify-content:center;padding:0 8px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:22px;color:#F3F6FA;line-height:1">102</span><span style="font-family:'IBM Plex Mono',monospace;font-size:7px;letter-spacing:.06em;color:#57B0EC">DISCHARGE</span></div><div style="flex:1;display:flex;flex-direction:column;gap:6px"><div style="flex:1;background:#151b24;border:1px solid #2A313D;border-left:2px solid #F5A623;border-radius:4px"></div><div style="flex:1;background:#151b24;border:1px solid #2A313D;border-radius:4px"></div></div></div>
              <div style="height:10px;flex:none;background:#212834;border-top:1px solid #2A313D;border-left:3px solid #F5A623"></div>
            </div>
            <div style="text-align:center"><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;color:#F3F6FA">4.3″</div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.04em;color:#6D7887;margin-top:2px">480 × 270 · 3 tiles</div></div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div style="width:320px;height:192px;background:#0E1217;border:1px solid #2A313D;border-radius:6px;overflow:hidden;display:flex;flex-direction:column">
              <div style="height:22px;flex:none;background:#141922;border-bottom:1px solid #2A313D"></div>
              <div style="height:26px;flex:none;margin:8px 8px 0;background:#241d10;border:1px solid #4a3a17;border-left:3px solid #F5A623;border-radius:4px;display:flex;align-items:center;padding:0 8px"><span style="font-family:'IBM Plex Sans';font-weight:600;font-size:9px;color:#F5A623">HIGH AIREND TEMP</span></div>
              <div style="flex:1;padding:8px;display:flex;gap:7px"><div style="flex:1.05;background:#1b2430;border:1px solid #3A4352;border-radius:4px;display:flex;flex-direction:column;justify-content:center;padding:0 10px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:30px;color:#F3F6FA;line-height:1">102</span><span style="font-family:'IBM Plex Mono',monospace;font-size:7.5px;letter-spacing:.06em;color:#57B0EC">DISCHARGE</span></div><div style="flex:1.3;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:7px"><div style="background:#151b24;border:1px solid #2A313D;border-left:2px solid #F5A623;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div></div></div>
              <div style="height:13px;flex:none;background:#212834;border-top:1px solid #2A313D;border-left:4px solid #F5A623"></div>
            </div>
            <div style="text-align:center"><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;color:#F3F6FA">7″ · baseline</div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.04em;color:#6D7887;margin-top:2px">800 × 480 · 5 tiles</div></div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:center;gap:12px">
            <div style="width:440px;height:264px;background:#0E1217;border:1px solid #2A313D;border-radius:7px;overflow:hidden;display:flex;flex-direction:column">
              <div style="height:28px;flex:none;background:#141922;border-bottom:1px solid #2A313D"></div>
              <div style="flex:1;padding:11px;display:flex;gap:10px"><div style="width:130px;flex:none;background:#1b2430;border:1px solid #3A4352;border-radius:5px;display:flex;flex-direction:column;justify-content:center;padding:0 14px"><span style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:44px;color:#F3F6FA;line-height:1">102</span><span style="font-family:'IBM Plex Mono',monospace;font-size:8.5px;letter-spacing:.06em;color:#57B0EC">DISCHARGE</span></div><div style="flex:1;display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:1fr 1fr;gap:8px"><div style="background:#151b24;border:1px solid #2A313D;border-left:2px solid #F5A623;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div><div style="background:#151b24;border:1px solid #2A313D;border-radius:4px"></div></div></div>
              <div style="height:16px;flex:none;background:#212834;border-top:1px solid #2A313D;border-left:5px solid #F5A623"></div>
            </div>
            <div style="text-align:center"><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:13px;color:#F3F6FA">10″</div><div style="font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.04em;color:#6D7887;margin-top:2px">1280 × 800 · 9 tiles</div></div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1.35fr 1fr">
          <div style="padding:24px 30px;border-right:1px solid #20262f">
            <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.12em;color:#6D7887;text-transform:uppercase;margin-bottom:16px">What each size keeps</div>
            <div style="display:flex;flex-direction:column;gap:0">
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:0 0 8px"><span></span><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#6D7887;text-align:center">4.3</span><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#6D7887;text-align:center">7</span><span style="font-family:'IBM Plex Mono',monospace;font-size:10px;color:#6D7887;text-align:center">10</span></div>
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:8px 0;border-top:1px solid #20262f"><span style="display:flex;align-items:center;gap:8px;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;color:#F3F6FA"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#57B0EC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg>Discharge Pressure</span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#2E9BE6"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#2E9BE6"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#2E9BE6"></span></span></div>
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:8px 0;border-top:1px solid #20262f"><span style="display:flex;align-items:center;gap:8px;font-family:'IBM Plex Sans';font-weight:600;font-size:13px;color:#F3F6FA"><svg width="12" height="12" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.4" stroke-linejoin="round"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg>Airend Temp <span style="font-family:'IBM Plex Mono',monospace;font-weight:500;font-size:9px;color:#b0904f">warning</span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#F5A623"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#F5A623"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#F5A623"></span></span></div>
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:8px 0;border-top:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-size:13px;color:#C4CCD6">% Capacity</span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span></div>
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:8px 0;border-top:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-size:13px;color:#C4CCD6">Motor Current</span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;border:1px solid #2A313D"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span></div>
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:8px 0;border-top:1px solid #20262f"><span style="font-family:'IBM Plex Sans';font-size:13px;color:#C4CCD6">Running Hours</span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;border:1px solid #2A313D"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span></div>
              <div style="display:grid;grid-template-columns:1fr 40px 40px 40px;align-items:center;padding:8px 0;border-top:1px solid #20262f;opacity:.72"><span style="font-family:'IBM Plex Sans';font-size:13px;color:#8892A0">Motor Power · Coolant · DC Bus · Daily Energy</span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;border:1px solid #2A313D"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;border:1px solid #2A313D"></span></span><span style="text-align:center"><span style="display:inline-block;width:9px;height:9px;border-radius:50%;background:#4a5563"></span></span></div>
            </div>
          </div>
          <div style="padding:24px 30px;display:flex;flex-direction:column;gap:14px">
            <div style="font-family:'IBM Plex Mono',monospace;font-weight:600;font-size:11px;letter-spacing:.12em;color:#6D7887;text-transform:uppercase">The fixed rules</div>
            <div style="display:flex;gap:12px;padding:14px 15px;background:#101720;border:1px solid #223247;border-radius:9px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#57B0EC" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:1px"><rect x="5.2" y="10.6" width="13.6" height="9.2" rx="2"/><path d="M8 10.6V8.2a4 4 0 0 1 8 0v2.4"/></svg><div><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:13.5px;color:#F3F6FA;margin-bottom:3px">Discharge never collapses</div><p style="margin:0;font-family:'IBM Plex Sans';font-size:12.5px;line-height:1.5;color:#A6B0BE">The protected primary is present and dominant at every size — it is the last thing standing.</p></div></div>
            <div style="display:flex;gap:12px;padding:14px 15px;background:#1a1408;border:1px solid #4a3a17;border-radius:9px"><svg width="20" height="20" viewBox="0 0 24 24" fill="#F5A623" stroke="#F5A623" stroke-width="1.3" stroke-linejoin="round" style="flex:none;margin-top:1px"><path d="M12 3.7 21 19.4a1 1 0 0 1-.87 1.5H3.87a1 1 0 0 1-.87-1.5z"/></svg><div><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:13.5px;color:#F3F6FA;margin-bottom:3px">Active warning always surfaces</div><p style="margin:0;font-family:'IBM Plex Sans';font-size:12.5px;line-height:1.5;color:#A6B0BE">A live warning keeps its tile band and its place on the status strip, even at 4.3″.</p></div></div>
            <div style="display:flex;gap:12px;padding:14px 15px;background:#12161D;border:1px solid #2A313D;border-radius:9px"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8892A0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="flex:none;margin-top:1px"><path d="M4 19V5M4 19h16"/><path d="M7 15l4-4 3 2 5-6"/></svg><div><div style="font-family:'IBM Plex Sans';font-weight:600;font-size:13.5px;color:#F3F6FA;margin-bottom:3px">Secondaries shed first</div><p style="margin:0;font-family:'IBM Plex Sans';font-size:12.5px;line-height:1.5;color:#A6B0BE">Electrical &amp; energy readings (Motor Power, DC Bus, Daily Energy, Coolant) drop before anything operational.</p></div></div>
          </div>
        </div>
      </div>
    </div>`,
  },
}
