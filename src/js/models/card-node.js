import {
  addClassName,
  removeClassName
} from 'content-kit-editor/utils/dom-utils';

const ACTIVE_CLASS_NAME = 'active';

export default class CardNode {
  constructor(editor, card, section, element, cardOptions) {
    this.editor = editor;
    this.card = card;
    this.section = section;
    this.cardOptions = cardOptions;
    this.element = element;

    this.mode = null;
    this.setupResult = null;
  }

  onSelect() {
    addClassName(this.element, ACTIVE_CLASS_NAME);
  }

  onUnSelect() {
    removeClassName(this.element, ACTIVE_CLASS_NAME);
  }

  render(mode) {
    if (this.mode === mode) { return; }

    this.teardown();

    this.mode = mode;
    this.setupResult = this.card[mode].setup(
      this.element,
      this.cardOptions,
      this.env,
      this.section.payload
    );
  }

  get env() {
    return {
      name: this.card.name,
      edit: () => this.edit(),
      save: (payload) => {
        this.section.payload = payload;

        this.editor.didUpdate();
        this.display();
      },
      cancel: () => this.display(),
      remove: () => this.remove()
    };
  }

  display() {
    this.render('display');
  }

  edit() {
    this.render('edit');
  }

  remove() {
    this.editor.run(postEditor => postEditor.removeSection(this.section));
  }

  teardown() {
    if (this.mode) {
      if (this.card[this.mode].teardown) {
        this.card[this.mode].teardown(this.setupResult);
      }
    }
  }
}
