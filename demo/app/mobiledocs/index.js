export default {
  mentionAtom: {
    version: '0.3.0',
    atoms: [
      ['mention-atom', 'Bob', {}]
    ],
    markups: [],
    cards: [],
    sections: [
      [1, 'h2', [
        [0, [], 0, 'Mention Atom']
      ]],
      [1, 'P', [
        [0, [], 0, 'Text before the atom. '],
        [1, [], 0, 0],
        [0, [], 0, ' Text after the atom.']
      ]]
    ]
  },
  codemirrorCard: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [
      ['codemirror-card']
    ],
    sections: [
      [1, 'h2', [
        [0, [], 0, 'Codemirror']
      ]],
      [10, 0],
    ]
  },
  empty: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [],
    sections: []
  },
  inputCard: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [
      ['input-card']
    ],
    sections: [
      [1, 'H2', [
        [[], 0, 'Input Card']
      ]],
      [10, 0],
      [1, 'P', [
        [0, [], 0, 'Text after the card.']
      ]]
    ]
  },
  imageCard: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [
      ['image-card']
    ],
    sections: [
      [1, 'p', [[0, [], 0, 'before']]],
      [10, 0],
      [1, 'p', [[0, [], 0, 'after']]]
    ]
  },
  selfieCard: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [
      ['selfie-card']
    ],
    sections: [
      [1, 'H2', [
        [0, [], 0, 'Selfie Card']
      ]],
      [10, 0]
    ]
  },
  simpleCard: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [
      ['simple-card']
    ],
    sections: [
      [1, 'p', [[0, [], 0, 'before']]],
      [10, 0],
      [1, 'p', [[0, [], 0, 'after']]]
    ]
  },
  simpleList: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [],
    sections: [
      [1, 'H2', [
        [0, [], 0, 'To do today:']
      ]],
      [3, 'ul', [
        [[0, [], 0, 'buy milk']],
        [[0, [], 0, 'water plants']],
        [[0, [], 0, 'world domination']]
      ]]
    ]
  },
  simple: {
    version: '0.3.0',
    atoms: [],
    markups: [],
    cards: [],
    sections: [
      [1, 'H2', [
        [0, [], 0, 'Hello World']
      ]],
      [1, 'p', [
        [0, [], 0, 'This is Mobiledoc-kit.']
      ]]
    ]
  }
};
