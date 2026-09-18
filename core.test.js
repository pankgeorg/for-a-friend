import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {makeReport, advance} from './core.js';
import {stories} from './stories.js';
test('all seven story paths have complete Greek and English content',()=>{
 assert.equal(stories.length,7);assert.equal(new Set(stories.map(s=>s.id)).size,7);
 for(const story of stories) { for(const pair of [story.title,story.reflection,...story.scenes]) {assert.equal(pair.length,2);for(const value of pair) assert.ok(value.trim());} }
});
test('progress cannot move beyond final scene',()=>{for(const story of stories) assert.equal(advance(story,story.scenes.length-1),story.scenes.length-1);});
test('report preserves original narrative without interpreting it',()=>{
 const text='A <script>alert(1)</script> & μια ιστορία\nsecond line';
 const report=makeReport({narrative:text,place:'Athens'},'el','intimidation');
 assert.equal(report.narrative,text);assert.equal(report.approximatePlace,'Athens');
 assert.equal(report.sharing.submitted,false);assert.equal(report.sharing.geographicAggregationConsent,false);
 assert.match(report.provenance,/unverified/);assert.equal(report.schemaVersion,1);
});
test('empty and oversized reports are rejected',()=>{assert.throws(()=>makeReport({narrative:'   '},'el'),/required/);assert.throws(()=>makeReport({narrative:'a'.repeat(20001)},'en'),/too-long/);});
test('manifest and all precache assets exist, including install icons',async()=>{
 const manifest=JSON.parse(await readFile(new URL('./manifest.webmanifest',import.meta.url),'utf8'));
 assert.equal(manifest.lang,'el');assert.equal(manifest.start_url,'./');
 for(const size of ['192x192','512x512']) assert.ok(manifest.icons.some(icon=>icon.sizes===size));
 const sw=await readFile(new URL('./sw.js',import.meta.url),'utf8');
 for(const match of sw.matchAll(/'\.\/([^']+)'/g)) await readFile(new URL(match[1],import.meta.url));
});
