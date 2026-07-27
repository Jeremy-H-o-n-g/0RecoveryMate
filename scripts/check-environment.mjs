const major = Number(process.versions.node.split('.')[0]);
if (major !== 24) {
  console.error(`Expected Node 24 LTS for the 2026-07-27 baseline; found ${process.version}`);
  process.exit(1);
}
console.log(`Node environment OK: ${process.version}`);
