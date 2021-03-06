/// <reference path="../../../node_modules/monaco-editor/monaco.d.ts" />
/// <reference path="../../../node_modules/monaco-yaml/monaco.d.ts" />

import { Injectable } from '@angular/core';
import { MonacoProviderService } from 'ng-monaco-editor';

const k8sSchema =
  'https://raw.githubusercontent.com/pengx17/k8s-form-in-action/master/schema/all.json';

/**
 * Custom monaco provider to do some customizations.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomMonacoProviderService extends MonacoProviderService {
  private ready: Promise<void>;
  private res: Function;
  async initMonaco() {
    if (!this.ready) {
      this.ready = new Promise(res => (this.res = res));
      await super.initMonaco();

      // Load custom yaml language service:
      await super.loadModule([
        // YAML language services are currently managed manually in thirdparty_lib
        'vs/basic-languages/monaco.contribution',
        'vs/language/yaml/monaco.contribution',
      ]);
      this.configYaml();

      this.res();
    }

    return this.ready;
  }

  private configYaml() {
    monaco.languages.yaml.yamlDefaults.setDiagnosticsOptions({
      validate: true,
      enableSchemaRequest: true,
      schemas: [
        {
          uri: k8sSchema,
          fileMatch: ['*'],
        },
      ],
    });
  }
}
