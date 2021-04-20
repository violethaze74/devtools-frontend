// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

import {assert} from 'chai';

import {getBrowserAndPages, goToResource, matchArray} from '../../shared/helper.js';
import {describe, it} from '../../shared/mocha-extensions.js';
import {expandIssue, expandResourceSection, extractTableFromResourceSection, getIssueByTitle, getResourcesElement, navigateToIssuesTab} from '../helpers/issues-helpers.js';

describe('CORS issues test', async () => {
  it('should display CORS violations with the correct affected resources', async () => {
    await goToResource('issues/cors-issue.html');
    const {target} = getBrowserAndPages();
    await target.evaluate(async () => {
      // @ts-ignore
      await window.doCorsFetches(`https://devtools.oopif.test:${document.location.port}`);
    });
    await navigateToIssuesTab();
    await expandIssue();
    const issueElement = await getIssueByTitle('Ensure CORS response header values are valid');
    assert.isNotNull(issueElement);
    if (issueElement) {
      const section = await getResourcesElement('items', issueElement);
      const text = await section.label.evaluate(el => el.textContent);
      // TODO(crbug.com/1189877): Remove 2nd space after fixing l10n presubmit check
      assert.strictEqual(text, '3  items');
      await expandResourceSection(section);
      const table = await extractTableFromResourceSection(section.content);
      assert.isNotNull(table);
      if (table) {
        assert.strictEqual(table.length, 4);
        assert.deepEqual(table[0], [
          'Request',
          'Status',
          'Preflight Request (if problematic)',
          'Header',
          'Problem',
          'Invalid Value (if available)',
        ]);
        matchArray(table[1], [
          /^devtools.oopif.test:.*/,
          'blocked',
          '',
          'Access-Control-Allow-Origin',
          'Missing Header',
          '',
        ]);
        matchArray(table[2], [
          /^devtools.oopif.test:.*/,
          'blocked',
          /^devtools.oopif.test:.*/,
          'Access-Control-Allow-Origin',
          'Missing Header',
          '',
        ]);
        matchArray(table[3], [
          /.*invalid-preflight.*/,
          'blocked',
          /.*invalid-preflight.*/,
          'Access-Control-Allow-Origin',
          'Missing Header',
          '',
        ]);
      }
    }
  });
});