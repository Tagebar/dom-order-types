import { useState } from "react";

const M = "'JetBrains Mono','SF Mono','Fira Code',monospace";
const VIEWS = [
  { id: "dom", label: "The DOM" },
  { id: "auction", label: "How Trades Work" },
  { id: "long", label: "Going Long" },
  { id: "short", label: "Going Short" },
  { id: "clicks", label: "Platform Clicks" },
  { id: "ref", label: "Reference" },
];

/* ═══ Helpers ═══ */
function Tag({ label, color }) {
  return <span style={{ fontSize: 9, color, background: color + "18", padding: "2px 6px", borderRadius: 3, fontFamily: M, fontWeight: 700, flexShrink: 0 }}>{label}</span>;
}
function Pill({ text, color }) {
  return <span style={{ fontSize: 10, color, background: color + "15", border: `1px solid ${color}44`, padding: "2px 8px", borderRadius: 4, fontFamily: M, fontWeight: 600 }}>{text}</span>;
}
function SH({ text, color }) {
  return <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: M, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 3, height: 14, background: color, borderRadius: 2 }} />{text}</div>;
}
function Box({ children, border, top }) {
  return <div style={{ background: "#0f172a", border: `1px solid ${border || "#1e293b"}`, borderRadius: 8, padding: 14, ...(top ? { borderTop: `2px solid ${top}` } : {}) }}>{children}</div>;
}

/* ═══ TAB 1: THE DOM ═══ */
function DomView() {
  const P = [4180, 4179, 4178, 4177, 4176, 4175, 4174, 4173, 4172, 4171, 4170, 4169, 4168];
  const C = 6; // 4174 = inside market
  const asks = [38, 52, 74, 29, 61, 43]; // above + at market
  const bids = [67, 31, 89, 55, 23, 71]; // below market

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontFamily: M, letterSpacing: 1.2, textTransform: "uppercase" }}>The Depth of Market ladder</div>

      {/* DOM Ladder */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          {/* Header */}
          <div style={{ display: "flex", padding: "6px 0", borderBottom: "1px solid #1e293b" }}>
            <div style={{ flex: 1, fontSize: 9, color: "#22c55e", textAlign: "center", fontFamily: M, letterSpacing: 1.5 }}>BID (Buy)</div>
            <div style={{ width: 70, fontSize: 9, color: "#64748b", textAlign: "center", fontFamily: M, letterSpacing: 1.5 }}>PRICE</div>
            <div style={{ flex: 1, fontSize: 9, color: "#ef4444", textAlign: "center", fontFamily: M, letterSpacing: 1.5 }}>ASK (Sell)</div>
          </div>
          {P.map((p, i) => {
            const isAbove = i < C;
            const isBelow = i > C;
            const isMid = i === C;
            const bid = isBelow ? bids[i - C - 1] : "";
            const ask = isAbove ? asks[i] : "";
            // Annotations
            let leftNote = "", rightNote = "";
            if (i === 1) { rightNote = "Sell Limits rest here"; }
            if (i === 2) { leftNote = "Buy Stops trigger here"; }
            if (i === 10) { rightNote = "Sell Stops trigger here"; }
            if (i === 11) { leftNote = "Buy Limits rest here"; }

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", height: 34,
                background: isMid ? "linear-gradient(90deg, #1e3a5f 0%, #0a0e17 50%, #5f1e1e 100%)" : "transparent",
                borderBottom: "1px solid #0f1629",
              }}>
                {/* Bid side */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {leftNote && <span style={{ fontSize: 9, color: "#22c55e88", fontFamily: M }}>{leftNote}</span>}
                  {bid && <div style={{ background: "#22c55e18", borderRadius: 3, padding: "2px 8px", fontSize: 12, color: "#22c55e", fontFamily: M, fontWeight: 500, minWidth: 32, textAlign: "center" }}>{bid}</div>}
                  {isMid && <span style={{ fontSize: 9, color: "#22c55e", fontFamily: M, fontWeight: 700 }}>Best Bid →</span>}
                </div>
                {/* Price */}
                <div style={{
                  width: 70, textAlign: "center", fontSize: 13,
                  fontWeight: isMid ? 800 : 500, fontFamily: M,
                  color: isMid ? "#f8fafc" : isAbove ? "#fca5a5" : "#86efac",
                }}>{p}</div>
                {/* Ask side */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {isMid && <span style={{ fontSize: 9, color: "#ef4444", fontFamily: M, fontWeight: 700 }}>← Best Ask</span>}
                  {ask && <div style={{ background: "#ef444418", borderRadius: 3, padding: "2px 8px", fontSize: 12, color: "#ef4444", fontFamily: M, fontWeight: 500, minWidth: 32, textAlign: "center" }}>{ask}</div>}
                  {rightNote && <span style={{ fontSize: 9, color: "#ef444488", fontFamily: M }}>{rightNote}</span>}
                </div>
              </div>
            );
          })}
          <div style={{ textAlign: "center", marginTop: 6, fontSize: 10, color: "#64748b", fontFamily: M }}>
            Spread = Best Ask − Best Bid = 1 tick
          </div>
        </div>
      </div>

      {/* Order placement rules */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Box top="#3b82f6">
          <SH text="LIMIT ORDERS" color="#3b82f6" />
          <div style={{ fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
            Passive — rest in the book.<br />
            Buy Limit → <span style={{ color: "#22c55e", fontWeight: 600 }}>below</span> market<br />
            Sell Limit → <span style={{ color: "#ef4444", fontWeight: 600 }}>above</span> market<br />
            Fill at your price or better.<br />
            <span style={{ color: "#94a3b8" }}>You provide liquidity.</span>
          </div>
        </Box>
        <Box top="#f59e0b">
          <SH text="STOP ORDERS" color="#f59e0b" />
          <div style={{ fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
            Dormant until triggered.<br />
            Buy Stop → <span style={{ color: "#22c55e", fontWeight: 600 }}>above</span> market<br />
            Sell Stop → <span style={{ color: "#ef4444", fontWeight: 600 }}>below</span> market<br />
            Becomes market order → slippage.<br />
            <span style={{ color: "#94a3b8" }}>You take liquidity.</span>
          </div>
        </Box>
      </div>
    </div>
  );
}

/* ═══ TAB 2: HOW TRADES WORK ═══ */
function AuctionView() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontFamily: M, letterSpacing: 1.2, textTransform: "uppercase" }}>Market microstructure & the auction</div>

      {/* The Spread */}
      <Box top="#60a5fa">
        <SH text="THE BID, THE ASK & THE SPREAD" color="#60a5fa" />
        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, width: "100%", maxWidth: 380 }}>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "#22c55e11", borderRadius: "8px 0 0 8px", border: "1px solid #22c55e33" }}>
              <div style={{ fontSize: 9, color: "#22c55e88", fontFamily: M, letterSpacing: 1 }}>BID</div>
              <div style={{ fontSize: 18, color: "#22c55e", fontFamily: M, fontWeight: 800 }}>4174</div>
              <div style={{ fontSize: 9, color: "#64748b", fontFamily: M, marginTop: 2 }}>Buyers waiting here</div>
            </div>
            <div style={{ padding: "8px 12px", background: "#1e293b", borderTop: "1px solid #334155", borderBottom: "1px solid #334155", textAlign: "center" }}>
              <div style={{ fontSize: 9, color: "#64748b", fontFamily: M }}>SPREAD</div>
              <div style={{ fontSize: 14, color: "#f8fafc", fontFamily: M, fontWeight: 700 }}>1 tick</div>
              <div style={{ fontSize: 9, color: "#64748b", fontFamily: M }}>$12.50</div>
            </div>
            <div style={{ flex: 1, textAlign: "center", padding: "10px 8px", background: "#ef444411", borderRadius: "0 8px 8px 0", border: "1px solid #ef444433" }}>
              <div style={{ fontSize: 9, color: "#ef444488", fontFamily: M, letterSpacing: 1 }}>ASK / OFFER</div>
              <div style={{ fontSize: 18, color: "#ef4444", fontFamily: M, fontWeight: 800 }}>4175</div>
              <div style={{ fontSize: 9, color: "#64748b", fontFamily: M, marginTop: 2 }}>Sellers waiting here</div>
            </div>
          </div>
        </div>
        <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.7, textAlign: "center" }}>
          The <span style={{ color: "#f8fafc", fontWeight: 600 }}>Bid</span> is the highest price buyers will pay.
          The <span style={{ color: "#f8fafc", fontWeight: 600 }}>Ask</span> (Offer) is the lowest price sellers will accept.
          The gap between them is the <span style={{ color: "#f8fafc", fontWeight: 600 }}>Spread</span>.
        </div>
      </Box>

      {/* Aggressive vs Passive */}
      <Box>
        <SH text="HOW A TRADE ACTUALLY HAPPENS" color="#f59e0b" />
        <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.7, marginBottom: 12 }}>
          A trade occurs when someone <span style={{ color: "#f8fafc", fontWeight: 600 }}>crosses the spread</span> — they pay the other side's price instead of waiting.
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Lift the Offer */}
          <div style={{ background: "#22c55e08", border: "1px solid #22c55e22", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>🟢</span>
              <span style={{ fontSize: 13, color: "#22c55e", fontWeight: 800, fontFamily: M }}>LIFT THE OFFER</span>
              <Tag label="AGGRESSIVE BUY" color="#22c55e" />
            </div>
            <div style={{ fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
              Buyer says "I'll pay <span style={{ color: "#ef4444", fontWeight: 600 }}>the Ask price</span> to get filled NOW."<br />
              They cross the spread → hit the resting sell order → trade prints at the Ask.<br />
              <span style={{ color: "#64748b" }}>On the footprint: this shows as a trade on the <span style={{ color: "#ef4444" }}>Ask column</span> → <span style={{ color: "#22c55e" }}>positive delta</span> (buying pressure).</span>
            </div>
          </div>
          {/* Hit the Bid */}
          <div style={{ background: "#ef444408", border: "1px solid #ef444422", borderRadius: 8, padding: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 14 }}>🔴</span>
              <span style={{ fontSize: 13, color: "#ef4444", fontWeight: 800, fontFamily: M }}>HIT THE BID</span>
              <Tag label="AGGRESSIVE SELL" color="#ef4444" />
            </div>
            <div style={{ fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
              Seller says "I'll accept <span style={{ color: "#22c55e", fontWeight: 600 }}>the Bid price</span> to get out NOW."<br />
              They cross the spread → hit the resting buy order → trade prints at the Bid.<br />
              <span style={{ color: "#64748b" }}>On the footprint: this shows as a trade on the <span style={{ color: "#22c55e" }}>Bid column</span> → <span style={{ color: "#ef4444" }}>negative delta</span> (selling pressure).</span>
            </div>
          </div>
        </div>
      </Box>

      {/* Footprint connection */}
      <Box top="#a78bfa">
        <SH text="READING IT ON THE FOOTPRINT" color="#a78bfa" />
        {/* Mini footprint visual */}
        <div style={{ display: "flex", justifyContent: "center", margin: "4px 0 12px" }}>
          <div style={{ background: "#0a0e17", borderRadius: 6, border: "1px solid #1e293b", overflow: "hidden", width: "100%", maxWidth: 300 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", padding: "4px 0", background: "#111827", borderBottom: "1px solid #1e293b" }}>
              <div style={{ textAlign: "center", fontSize: 9, color: "#22c55e88", fontFamily: M }}>BID VOL</div>
              <div style={{ textAlign: "center", fontSize: 9, color: "#64748b", fontFamily: M, padding: "0 8px" }}>PRICE</div>
              <div style={{ textAlign: "center", fontSize: 9, color: "#ef444488", fontFamily: M }}>ASK VOL</div>
            </div>
            {[
              { p: 4177, b: 12, a: 89, highlight: "ask", note: "← Aggressive buyers here" },
              { p: 4176, b: 45, a: 52 },
              { p: 4175, b: 38, a: 41 },
              { p: 4174, b: 67, a: 23 },
              { p: 4173, b: 94, a: 8, highlight: "bid", note: "← Aggressive sellers here" },
              { p: 4172, b: 55, a: 14 },
            ].map((r, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", height: 30, borderBottom: "1px solid #0f1629" }}>
                <div style={{ textAlign: "center", fontSize: 12, fontFamily: M, color: r.highlight === "bid" ? "#ef4444" : "#22c55e", fontWeight: r.highlight === "bid" ? 700 : 400, opacity: r.highlight === "bid" ? 1 : 0.6 }}>{r.b}</div>
                <div style={{ textAlign: "center", fontSize: 11, fontFamily: M, color: "#94a3b8", padding: "0 8px" }}>{r.p}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <span style={{ fontSize: 12, fontFamily: M, color: r.highlight === "ask" ? "#22c55e" : "#ef4444", fontWeight: r.highlight === "ask" ? 700 : 400, opacity: r.highlight === "ask" ? 1 : 0.6 }}>{r.a}</span>
                  {r.note && <span style={{ fontSize: 8, color: "#64748b", fontFamily: M }}>{r.note}</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
          <div><span style={{ color: "#22c55e", fontWeight: 700 }}>Big number on Ask side</span> = aggressive buyers lifted the offer = buying pressure = <span style={{ color: "#22c55e" }}>+delta</span></div>
          <div><span style={{ color: "#ef4444", fontWeight: 700 }}>Big number on Bid side</span> = aggressive sellers hit the bid = selling pressure = <span style={{ color: "#ef4444" }}>−delta</span></div>
          <div style={{ color: "#94a3b8", marginTop: 4 }}>
            <span style={{ color: "#f8fafc", fontWeight: 600 }}>Delta</span> = Ask volume − Bid volume at each price.<br />
            <span style={{ color: "#f8fafc", fontWeight: 600 }}>Cumulative Delta</span> = running total across bars → shows who's in control.
          </div>
          <div style={{ color: "#94a3b8", marginTop: 4 }}>
            <span style={{ color: "#f59e0b", fontWeight: 600 }}>Imbalance</span> = one side has 3× or more volume than the other → stacked imbalances = strong directional conviction.
          </div>
          <div style={{ color: "#94a3b8" }}>
            <span style={{ color: "#a78bfa", fontWeight: 600 }}>Absorption</span> = big volume on the bid but price doesn't drop (or big on ask but price doesn't rise) → passive limit orders soaking up aggression. Often precedes reversal.
          </div>
        </div>
      </Box>

      {/* Passive vs Aggressive summary */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Box>
          <SH text="PASSIVE (Limit)" color="#3b82f6" />
          <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.7 }}>
            Resting order in the book.<br />
            Provides liquidity.<br />
            Waits to be filled.<br />
            <span style={{ color: "#3b82f6", fontWeight: 600 }}>You set the price.</span>
          </div>
        </Box>
        <Box>
          <SH text="AGGRESSIVE (Market)" color="#f97316" />
          <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.7 }}>
            Crosses the spread.<br />
            Takes liquidity.<br />
            Fills immediately.<br />
            <span style={{ color: "#f97316", fontWeight: 600 }}>You pay the spread.</span>
          </div>
        </Box>
      </div>
    </div>
  );
}

/* ═══ TAB 3 & 4: LONG / SHORT ═══ */
function TradeView({ side }) {
  const isLong = side === "long";
  const accent = isLong ? "#22c55e" : "#ef4444";
  const title = isLong ? "GOING LONG (BUY)" : "GOING SHORT (SELL)";

  const prices = [4180, 4179, 4178, 4177, 4176, 4175, 4174, 4173, 4172, 4171, 4170, 4169, 4168];
  const entryIdx = isLong ? 8 : 4;
  const tpIdx = isLong ? 3 : 11;
  const slIdx = isLong ? 11 : 1;

  const entryLabel = isLong ? "BUY LIMIT ENTRY" : "SELL LIMIT ENTRY";
  const tpLabel = isLong ? "Sell Limit (TP)" : "Buy Limit (TP)";
  const slLabel = isLong ? "Sell Stop (SL)" : "Buy Stop (SL)";

  const anatomy = isLong ? [
    { step: "1", text: `Entry: Buy Limit at ${prices[entryIdx]} (below market)`, color: "#22c55e", tag: "ENTRY", detail: "Passive buy — rests on bid side, you provide liquidity" },
    { step: "2", text: `Take Profit: Sell Limit at ${prices[tpIdx]} (above entry)`, color: "#a78bfa", tag: "TP", detail: "Passive sell — rests on ask side, exits at your target" },
    { step: "3", text: `Stop Loss: Sell Stop at ${prices[slIdx]} (below entry)`, color: "#f97316", tag: "SL", detail: "Reactive sell — triggers if price drops, becomes market order" },
  ] : [
    { step: "1", text: `Entry: Sell Limit at ${prices[entryIdx]} (above market)`, color: "#ef4444", tag: "ENTRY", detail: "Passive sell — rests on ask side, you provide liquidity" },
    { step: "2", text: `Take Profit: Buy Limit at ${prices[tpIdx]} (below entry)`, color: "#a78bfa", tag: "TP", detail: "Passive buy — rests on bid side, exits at your target" },
    { step: "3", text: `Stop Loss: Buy Stop at ${prices[slIdx]} (above entry)`, color: "#f97316", tag: "SL", detail: "Reactive buy — triggers if price rises, becomes market order" },
  ];

  const exitSummary = isLong ? {
    title: "YOU'RE LONG — HOW TO EXIT",
    items: [
      { label: "To take profit", order: "SELL LIMIT", where: "above your entry", type: "Passive exit — you choose the price", color: "#a78bfa" },
      { label: "To stop out", order: "SELL STOP", where: "below your entry", type: "Reactive exit — market triggers it", color: "#f97316" },
      { label: "To exit NOW", order: "SELL MARKET", where: "hit the bid", type: "Aggressive exit — instant, you pay the spread", color: "#ef4444" },
    ],
  } : {
    title: "YOU'RE SHORT — HOW TO EXIT",
    items: [
      { label: "To take profit", order: "BUY LIMIT", where: "below your entry", type: "Passive exit — you choose the price", color: "#a78bfa" },
      { label: "To stop out", order: "BUY STOP", where: "above your entry", type: "Reactive exit — market triggers it", color: "#f97316" },
      { label: "To exit NOW", order: "BUY MARKET", where: "lift the offer", type: "Aggressive exit — instant, you pay the spread", color: "#22c55e" },
    ],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontFamily: M, letterSpacing: 1.2, textTransform: "uppercase" }}>{title}</div>

      {/* DOM with annotations */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 440 }}>
          {prices.map((p, i) => {
            const isEntry = i === entryIdx;
            const isTp = i === tpIdx;
            const isSl = i === slIdx;
            const hasLabel = isEntry || isTp || isSl;
            const labelColor = isEntry ? accent : isTp ? "#a78bfa" : "#f97316";
            const labelText = isEntry ? entryLabel : isTp ? tpLabel : slLabel;
            const labelIcon = isEntry ? (isLong ? "📥" : "📤") : isTp ? "🎯" : "🛡";
            const tagText = isEntry ? "ENTRY" : isTp ? "TP" : "SL";

            return (
              <div key={i} style={{
                display: "flex", alignItems: "center", height: 34, padding: "0 8px",
                background: hasLabel ? labelColor + "08" : "transparent",
                borderBottom: "1px solid #0f1629",
                borderLeft: isEntry ? `3px solid ${accent}` : isTp ? "3px solid #a78bfa" : isSl ? "3px solid #f97316" : "3px solid transparent",
              }}>
                {/* Label */}
                <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 4 }}>
                  {hasLabel && (
                    <>
                      <span style={{ fontSize: 12 }}>{labelIcon}</span>
                      <span style={{ fontSize: 10, color: labelColor, fontWeight: 700, fontFamily: M }}>{labelText}</span>
                      <Tag label={tagText} color={labelColor} />
                    </>
                  )}
                </div>
                {/* Price */}
                <div style={{ fontSize: 13, fontWeight: hasLabel ? 700 : 500, fontFamily: M, color: hasLabel ? "#f8fafc" : "#64748b", width: 50, textAlign: "center" }}>{p}</div>
                {/* Ticks */}
                <div style={{ width: 80, textAlign: "right", fontSize: 10, fontFamily: M }}>
                  {isTp && <span style={{ color: "#a78bfa" }}>+{Math.abs(entryIdx - tpIdx)} ticks</span>}
                  {isSl && <span style={{ color: "#f97316" }}>−{Math.abs(slIdx - entryIdx)} ticks</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trade anatomy */}
      <Box>
        <SH text="TRADE ANATOMY" color={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {anatomy.map(r => (
            <div key={r.step} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: r.color + "22", border: `1px solid ${r.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: r.color, fontWeight: 700, fontFamily: M, flexShrink: 0 }}>{r.step}</div>
              <div>
                <div style={{ fontSize: 12, color: "#e2e8f0", fontFamily: M, fontWeight: 600 }}>{r.text} <Tag label={r.tag} color={r.color} /></div>
                <div style={{ fontSize: 10, color: "#64748b", fontFamily: M, marginTop: 2 }}>{r.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, fontSize: 11, color: "#64748b", fontFamily: M }}>
          R:R = {Math.abs(entryIdx - tpIdx)}:{Math.abs(slIdx - entryIdx)} ({(Math.abs(entryIdx - tpIdx) / Math.abs(slIdx - entryIdx)).toFixed(2)}:1) · OCO bracket — one fills, other cancels
        </div>
      </Box>

      {/* Exit summary - THE KEY SECTION */}
      <Box top={accent}>
        <SH text={exitSummary.title} color={accent} />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {exitSummary.items.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "#111827", borderRadius: 6, borderLeft: `3px solid ${item.color}` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M }}>{item.label}</div>
                <div style={{ fontSize: 12, color: item.color, fontWeight: 700, fontFamily: M }}>{item.order} <span style={{ fontWeight: 500, color: "#64748b" }}>{item.where}</span></div>
              </div>
              <div style={{ fontSize: 9, color: "#64748b", fontFamily: M, maxWidth: 140, textAlign: "right" }}>{item.type}</div>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
}

/* ═══ TAB 5: PLATFORM CLICKS ═══ */
function Step2({ num, text, pills }) {
  return (
    <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6 }}>
      <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#94a3b8", fontFamily: M, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{num}</div>
      <div style={{ fontSize: 11, color: "#e2e8f0", fontFamily: M, lineHeight: 1.6 }}>
        {text}
        {pills && <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 3 }}>{pills}</div>}
      </div>
    </div>
  );
}

function ClicksView() {
  const [side, setSide] = useState("long");
  const isLong = side === "long";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontFamily: M, letterSpacing: 1.2, textTransform: "uppercase" }}>Platform DOM shortcuts</div>

      {/* Toggle */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ display: "flex", gap: 2, background: "#111827", borderRadius: 6, padding: 2 }}>
          {["long", "short"].map(s => (
            <button key={s} onClick={() => setSide(s)} style={{
              padding: "6px 24px", fontSize: 11, fontWeight: side === s ? 700 : 500,
              color: side === s ? (s === "long" ? "#22c55e" : "#ef4444") : "#64748b",
              background: side === s ? "#1e293b" : "transparent",
              border: "none", borderRadius: 4, cursor: "pointer", fontFamily: M, textTransform: "uppercase",
            }}>{s}</button>
          ))}
        </div>
      </div>

      {/* NT8 Desktop */}
      <Box>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>🖥</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#60a5fa", fontFamily: M }}>NinjaTrader 8 Desktop</span>
        </div>
        <Step2 num="1" text="Select your ATM Strategy first (auto-attaches SL + TP bracket)" />
        <Step2 num="2" text={isLong
          ? "LEFT CLICK the BID column (left side) at your entry price → Buy Limit"
          : "LEFT CLICK the ASK column (right side) at your entry price → Sell Limit"
        } pills={[
          <Pill key="a" text="Left Click" color="#94a3b8" />,
          <Pill key="b" text={isLong ? "Bid / Left" : "Ask / Right"} color={isLong ? "#22c55e" : "#ef4444"} />,
        ]} />
        <Step2 num="3" text="ATM bracket auto-places your SL + TP. Done." />
      </Box>

      {/* NT8 Web */}
      <Box>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>🌐</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#a78bfa", fontFamily: M }}>NinjaTrader Web</span>
        </div>
        {isLong ? (<>
          <Step2 num="1" text="Entry: LEFT CLICK on LEFT (Bid) side → Buy Limit" pills={[<Pill key="a" text="Left Click" color="#94a3b8" />, <Pill key="b" text="Bid / Left" color="#22c55e" />, <Tag key="t" label="ENTRY" color="#22c55e" />]} />
          <Step2 num="2" text="Stop: RIGHT CLICK on RIGHT (Ask) side below entry → Sell Stop" pills={[<Pill key="a" text="Right Click" color="#94a3b8" />, <Pill key="b" text="Ask / Right" color="#ef4444" />, <Tag key="t" label="SL" color="#f97316" />]} />
          <Step2 num="3" text="Target: LEFT CLICK on RIGHT (Ask) side above entry → Sell Limit" pills={[<Pill key="a" text="Left Click" color="#94a3b8" />, <Pill key="b" text="Ask / Right" color="#ef4444" />, <Tag key="t" label="TP" color="#a78bfa" />]} />
        </>) : (<>
          <Step2 num="1" text="Entry: LEFT CLICK on RIGHT (Ask) side → Sell Limit" pills={[<Pill key="a" text="Left Click" color="#94a3b8" />, <Pill key="b" text="Ask / Right" color="#ef4444" />, <Tag key="t" label="ENTRY" color="#ef4444" />]} />
          <Step2 num="2" text="Stop: RIGHT CLICK on LEFT (Bid) side above entry → Buy Stop" pills={[<Pill key="a" text="Right Click" color="#94a3b8" />, <Pill key="b" text="Bid / Left" color="#22c55e" />, <Tag key="t" label="SL" color="#f97316" />]} />
          <Step2 num="3" text="Target: LEFT CLICK on LEFT (Bid) side below entry → Buy Limit" pills={[<Pill key="a" text="Left Click" color="#94a3b8" />, <Pill key="b" text="Bid / Left" color="#22c55e" />, <Tag key="t" label="TP" color="#a78bfa" />]} />
        </>)}
        <div style={{ marginTop: 6, fontSize: 10, color: "#64748b", fontFamily: M }}>
          Mnemonic: <span style={{ color: "#f8fafc", fontWeight: 700 }}>{isLong ? "LL · RR · LR" : "LR · RL · LL"}</span>
          <span style={{ color: "#475569" }}> (click+side for Entry · Stop · TP)</span>
        </div>
      </Box>

      {/* Sierra Chart */}
      <Box>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ fontSize: 14 }}>📊</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#22c55e", fontFamily: M }}>Sierra Chart</span>
        </div>
        {isLong ? (<>
          <Step2 num="1" text="Entry: Click the BID column (Green/Left) → Buy Limit" pills={[<Pill key="b" text="Green / Bid" color="#22c55e" />, <Tag key="t" label="ENTRY" color="#22c55e" />]} />
          <Step2 num="2" text="Stop: Click the ASK column (Red/Right) below entry → Sell Stop" pills={[<Pill key="b" text="Red / Ask" color="#ef4444" />, <Tag key="t" label="SL" color="#f97316" />]} />
          <Step2 num="3" text="Target: Click the ASK column (Red/Right) above entry → Sell Limit" pills={[<Pill key="b" text="Red / Ask" color="#ef4444" />, <Tag key="t" label="TP" color="#a78bfa" />]} />
        </>) : (<>
          <Step2 num="1" text="Entry: Click the ASK column (Red/Right) → Sell Limit" pills={[<Pill key="b" text="Red / Ask" color="#ef4444" />, <Tag key="t" label="ENTRY" color="#ef4444" />]} />
          <Step2 num="2" text="Stop: Click the BID column (Green/Left) above entry → Buy Stop" pills={[<Pill key="b" text="Green / Bid" color="#22c55e" />, <Tag key="t" label="SL" color="#f97316" />]} />
          <Step2 num="3" text="Target: Click the BID column (Green/Left) below entry → Buy Limit" pills={[<Pill key="b" text="Green / Bid" color="#22c55e" />, <Tag key="t" label="TP" color="#a78bfa" />]} />
        </>)}
        <div style={{ marginTop: 6, fontSize: 10, color: "#64748b", fontFamily: M }}>
          Mnemonic: <span style={{ color: "#f8fafc", fontWeight: 700 }}>{isLong ? "G · R · R" : "R · G · G"}</span>
          <span style={{ color: "#475569" }}> (column colour for Entry · Stop · TP)</span>
        </div>
      </Box>

      {/* Naked position warning */}
      <Box top="#f97316">
        <SH text="⚠ ENTERED WITHOUT A BRACKET?" color="#f97316" />
        <div style={{ fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
          You're in a live position with no protection. <span style={{ color: "#f8fafc", fontWeight: 700 }}>Add Stop Loss FIRST, then Take Profit.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 8, fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.6 }}>
          <div><span style={{ color: "#60a5fa", fontWeight: 600 }}>NT8:</span> Right-click position → Create OCO Bracket, or apply ATM to live position</div>
          <div><span style={{ color: "#a78bfa", fontWeight: 600 }}>NT8 Web:</span> Manually place SL (right click) then TP (left click) on the DOM</div>
          <div><span style={{ color: "#22c55e", fontWeight: 600 }}>Sierra:</span> Right-click order → Attach OCO bracket, or place manually and link as OCO</div>
        </div>
      </Box>
    </div>
  );
}

/* ═══ TAB 6: REFERENCE ═══ */
function RefView() {
  const rows = [
    { type: "Market", where: "—", fill: "Immediate, any price", use: "Get in / out NOW", slip: "✓" },
    { type: "Buy Limit", where: "Below", fill: "At price or better", use: "Buy dips (passive)", slip: "—" },
    { type: "Sell Limit", where: "Above", fill: "At price or better", use: "Sell rallies / TP", slip: "—" },
    { type: "Buy Stop", where: "Above", fill: "Market on trigger", use: "Breakout / SL on short", slip: "✓" },
    { type: "Sell Stop", where: "Below", fill: "Market on trigger", use: "Breakdown / SL on long", slip: "✓" },
    { type: "Stop-Limit", where: "Either", fill: "Limit on trigger", use: "Controlled trigger", slip: "May miss" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontFamily: M, letterSpacing: 1.2, textTransform: "uppercase" }}>Quick reference</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11, fontFamily: M }}>
          <thead><tr>
            {["Type", "Where", "Fill", "Use", "Slip"].map(h => (
              <th key={h} style={{ padding: "8px 6px", textAlign: "left", color: "#64748b", borderBottom: "1px solid #1e293b", fontSize: 9, letterSpacing: 1, textTransform: "uppercase" }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #0f1629" }}>
                <td style={{ padding: "7px 6px", color: r.type.includes("Buy") ? "#22c55e" : r.type.includes("Sell") ? "#ef4444" : "#f8fafc", fontWeight: 700, whiteSpace: "nowrap" }}>{r.type}</td>
                <td style={{ padding: "7px 6px", color: "#cbd5e1" }}>{r.where}</td>
                <td style={{ padding: "7px 6px", color: "#cbd5e1" }}>{r.fill}</td>
                <td style={{ padding: "7px 6px", color: "#94a3b8" }}>{r.use}</td>
                <td style={{ padding: "7px 6px", color: r.slip === "✓" ? "#f97316" : r.slip === "—" ? "#22c55e" : "#fbbf24" }}>{r.slip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stop loss vs stop limit */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <Box top="#22c55e">
          <SH text="STOP LOSS (Market)" color="#22c55e" />
          <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.7 }}>
            Guarantees <span style={{ color: "#f8fafc", fontWeight: 600 }}>execution</span>.<br />
            Becomes market on trigger.<br />
            You WILL get flat.<br />
            Slippage in fast moves.<br />
            <span style={{ color: "#22c55e", fontWeight: 700 }}>✓ Use for scalping</span>
          </div>
        </Box>
        <Box top="#ef4444">
          <SH text="STOP LIMIT" color="#ef4444" />
          <div style={{ fontSize: 11, color: "#94a3b8", fontFamily: M, lineHeight: 1.7 }}>
            Guarantees <span style={{ color: "#f8fafc", fontWeight: 600 }}>price</span>.<br />
            Becomes limit on trigger.<br />
            May NOT fill in a flush.<br />
            Needs a counterparty.<br />
            <span style={{ color: "#ef4444", fontWeight: 700 }}>✗ Risky for protection</span>
          </div>
        </Box>
      </div>

      {/* Cheat sheet */}
      <Box top="#60a5fa">
        <SH text="CHEAT SHEET" color="#60a5fa" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 11, color: "#cbd5e1", fontFamily: M, lineHeight: 1.7 }}>
          <div>Limit = <span style={{ color: "#f8fafc", fontWeight: 600 }}>you set the price</span> (passive, provide liquidity)</div>
          <div>Stop = <span style={{ color: "#f8fafc", fontWeight: 600 }}>market sets the fill</span> (reactive, take liquidity)</div>
          <div>TP is always a <span style={{ color: "#f8fafc", fontWeight: 600 }}>Limit</span> — exit passively at target</div>
          <div>SL is always a <span style={{ color: "#f8fafc", fontWeight: 600 }}>Stop</span> — exit reactively for protection</div>
          <div>OCO = One Cancels Other — TP fills → SL cancels</div>
          <div style={{ color: "#f97316", fontWeight: 600, marginTop: 4 }}>ALWAYS attach bracket BEFORE entry. SL first if adding manually.</div>
        </div>
      </Box>
    </div>
  );
}

/* ═══ APP ═══ */
export default function App() {
  const [view, setView] = useState("dom");
  return (
    <div style={{ minHeight: "100vh", background: "#030712", color: "#f8fafc", fontFamily: M, padding: "20px 10px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <div style={{ fontSize: 9, letterSpacing: 4, color: "#3b82f6", marginBottom: 4, textTransform: "uppercase" }}>ES Futures</div>
        <div style={{ fontSize: 18, fontWeight: 800, background: "linear-gradient(135deg, #60a5fa, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>DOM & Order Types</div>
      </div>

      <div style={{ display: "flex", gap: 2, background: "#111827", borderRadius: 8, padding: 3, marginBottom: 14, width: "100%", maxWidth: 520, overflowX: "auto" }}>
        {VIEWS.map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            flex: 1, padding: "7px 2px", fontSize: 9, fontWeight: view === v.id ? 700 : 500,
            color: view === v.id ? "#f8fafc" : "#64748b",
            background: view === v.id ? "#1e293b" : "transparent",
            border: "none", borderRadius: 6, cursor: "pointer", fontFamily: M,
            whiteSpace: "nowrap", minWidth: 0, transition: "all 0.15s",
          }}>{v.label}</button>
        ))}
      </div>

      <div style={{ width: "100%", maxWidth: 520 }}>
        {view === "dom" && <DomView />}
        {view === "auction" && <AuctionView />}
        {view === "long" && <TradeView side="long" />}
        {view === "short" && <TradeView side="short" />}
        {view === "clicks" && <ClicksView />}
        {view === "ref" && <RefView />}
      </div>

      <div style={{ marginTop: 20, fontSize: 9, color: "#334155", textAlign: "center", fontFamily: M }}>© tagebar · ES scalping reference</div>
    </div>
  );
}
