export default {
  hut: {
    cost: {
      wood: 2
    },
    benefit: {
      pop: 2
    }
  },
  sawmill: {
    cost: {
      wood: 1,
      pop: 1
    },
    benefit: {
      wood: 2
    }
  },
  farm: {
    cost: {
      pop: 1
    },
    benefit: {
      food: 3
    }
  },
  quarry: {
    cost: {
      wood: 10,
      pop: 3
    },
    benefit: {
      stone: 3
    }
  },
  mine: {
    cost: {
      pop: 5,
      stone: 10,
      wood: 10
    },
    benefit: {
      iron: 5
    }
  },
  brewery: {
    cost: {
      pop: 2,
      wood: 5,
      stone: 10,
      iron: 3
    },
    mats: {
      food: 2
    },
    benefit: {
      luxuries: 1
    }
  },
  carpenter: {
    cost: {
      pop: 3,
      wood: 7,
      stone: 10,
      iron: 15
    },
    mats: {
      wood: 10
    },
    benefit: {
      luxuries: 2
    }
  },
  sculptor: {
    cost: {
      pop: 4,
      wood: 10,
      stone: 15,
      iron: 10
    },
    mats: {
      stone: 10
    },
    benefit: {
      luxuries: 3
    }
  },
  jeweler: {
    cost: {
      pop: 5,
      wood: 10,
      stone: 10,
      iron: 15
    },
    mats: {
      iron: 10
    },
    benefit: {
      luxuries: 4
    }
  },
  alchemist: {
    cost: {
      pop: 3,
      wood: 15,
      stone: 20,
      iron: 20
    },
    mats: {
      food: 5,
      stone: 5
    },
    benefit: {
      medicine: 1
    }
  },
  blacksmith: {
    cost: {
      pop: 3,
      wood: 15,
      stone: 20,
      iron: 20
    },
    mats: {
      wood: 5,
      iron: 5
    },
    benefit: {
      weapons: 1
    }
  },
  church: {
    cost: {
      pop: 1,
      wood: 50,
      stone: 50,
      iron: 50
    },
    benefit: {
      happiness: 2
    }
  }
}