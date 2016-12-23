// Test setup:
import { expect, sinon } from '@tractor/unit-test';

// Dependencies:
import * as tractorFileStructure from '@tractor/file-structure';
import * as tractorLogger from '@tractor/logger';

// Errors:
import { TractorError } from '@tractor/error-handler';

// Under test:
import { createTractorDirectory } from './create-tractor-directory';

describe('tractor - create-tractor-directory:', () => {
    it.skip('should create the tractor directory', async () => {
        sinon.stub(tractorFileStructure, 'createDir').resolves();

        try {
            await createTractorDirectory({
                directory: './directory'
            });
            expect(tractorFileStructure.createDir).to.have.been.calledWith('directory');
        } finally {
            tractorFileStructure.createDir.restore();
        }
    });

    it.skip('should tell the user if the directory already exists', async () => {
        sinon.stub(tractorFileStructure, 'createDir').rejects(new TractorError('"directory" already exists.'));
        sinon.stub(tractorLogger, 'warn');

        try {
            await createTractorDirectory({
                directory: 'directory'
            });
            expect(tractorLogger.warn).to.have.been.calledWith('"directory" already exists. Moving on...');
        } finally {
            tractorFileStructure.createDir.restore();
            tractorLogger.warn.restore();
        }
    });
});