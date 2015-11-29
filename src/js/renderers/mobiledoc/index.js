import MobiledocRenderer_0_2, { MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_2 } from './0-2';
import MobiledocRenderer_0_3, { MOBILEDOC_VERSION as MOBILEDOC_VERSION_0_3 } from './0-3';

export const MOBILEDOC_VERSION = MOBILEDOC_VERSION_0_2;

export default {
  render(post, version) {
    switch (version) {
      case MOBILEDOC_VERSION_0_2:
      case undefined:
      case null:
        return MobiledocRenderer_0_2.render(post);
      case MOBILEDOC_VERSION_0_3:
        return MobiledocRenderer_0_3.render(post);
      default:
        throw new Error(`Unknown version of mobiledoc renderer requested: ${version}`);
    }
  }
};
