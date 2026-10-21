import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getStateFromPath } from '@react-navigation/core';

// Test the real configuration using the same serializers that native re-exports,
// without loading React Native's platform runtime in Node.
const source = (await readFile(new URL('../src/routes/linking.js', import.meta.url), 'utf8'))
  .replace("'@react-navigation/native'", JSON.stringify(import.meta.resolve('@react-navigation/core')));
const { default: linking } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

test('home, child menu and goals have distinct, reversible URLs', () => {
  for (const [name, path] of [['Home', '/'], ['ChildMenu', '/crianca'], ['WeeklyGoals', '/crianca/metas']]) {
    const state = { index: 0, routes: [{ name }] };
    assert.equal(linking.getPathFromState(state, linking.config), path);
    assert.equal(getStateFromPath(path, linking.config).routes.at(-1).name, name);
  }
});

test('all configured screens can be opened by URL', () => {
  for (const name of Object.keys(linking.config.screens)) {
    const path = linking.getPathFromState({ index: 0, routes: [{ name }] }, linking.config);
    assert.equal(getStateFromPath(path, linking.config).routes.at(-1).name, name);
  }
});

test('lesson URLs preserve the module and numeric index without exposing video data', () => {
  const params = { initialIndex: 2, module: 'dentist', videosFromMenu: [{ id: 'video-1' }] };
  const state = { index: 0, routes: [{ name: 'ChildLesson', params }] };
  const path = linking.getPathFromState(state, linking.config);
  assert.ok(!path.includes('videosFromMenu'));
  assert.deepEqual(getStateFromPath(path, linking.config).routes.at(-1).params, {
    initialIndex: 2, module: 'dentist',
  });
  assert.equal(state.routes[0].params, params);
  assert.equal(params.videosFromMenu[0].id, 'video-1');
});

test('achievement boolean parameters round-trip correctly', () => {
  const state = { index: 0, routes: [{ name: 'StickerAchievementScreen', params: {
    isFinalAchievement: false, showModuleFinalAchievement: true,
    earnedStickers: [{ id: 'sticker-1' }],
  } }] };
  const path = linking.getPathFromState(state, linking.config);
  assert.ok(!path.includes('earnedStickers'));
  assert.deepEqual(getStateFromPath(path, linking.config).routes.at(-1).params, {
    isFinalAchievement: false, showModuleFinalAchievement: true,
  });
});
