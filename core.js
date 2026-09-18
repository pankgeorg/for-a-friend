export function advance(story, index) { return Math.min(index + 1, story.scenes.length - 1); }
export function makeReport(input, language, scenarioId) {
  const narrative = String(input.narrative || '').trim();
  if (!narrative) throw new Error('narrative-required');
  if (narrative.length > 20000) throw new Error('narrative-too-long');
  return {schemaVersion: 1, language, scenarioId: scenarioId || null,
    narrative, incidentDate: String(input.incidentDate || ''),
    approximatePlace: String(input.place || '').trim(),
    relationship: String(input.relationship || '').trim(),
    recordedAtDeviceTime: new Date().toISOString(),
    provenance: 'Self-written account; device time is unverified. No independent verification or submission.',
    sharing: {submitted: false, geographicAggregationConsent: false}};
}
