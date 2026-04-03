const EMOJIS = ["⚡","👀","🌊"];
const SYMBOLS = ["⟡","⌁","𖤐"];

const styles = [
  (t)=>`*${t}*`,
  (t)=>`_${t}_`,
  (t)=>`\`${t}\``,
  (t)=>`*_${t}_*`
];

function r(a){ return a[Math.floor(Math.random()*a.length)]; }

export function format(text){
  const styled = r(styles)(text);

  return Math.random() < 0.5
    ? `${r(EMOJIS)} ${styled}`
    : `${r(SYMBOLS)} ${styled}`;
}
