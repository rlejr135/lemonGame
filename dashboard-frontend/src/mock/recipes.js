export const mockUsers = ["ptos1", "ptos2", "ptos3", "ptos4", "ptos5"];

export const mockTreeData = {
  ptos1: {
    Clean: {
      PM1: ["CleanStep_A", "CleanStep_B", "CleanFast"],
      PM2: ["CleanPrep_X", "CleanPrep_Y"]
    },
    Process: {
      PM1: ["Proc_100", "Proc_150", "Proc_Heavy"],
      PM2: ["ProcX_1", "ProcX_2"]
    }
  },

  ptos2: {
    Clean: {
      PM1: ["C1_A", "C1_B"],
      PM2: ["C2_X", "C2_Y"]
    },
    Process: {
      PM1: ["P1_Main", "P1_Deep"],
      PM2: ["P2_Light", "P2_Fast"]
    }
  },

  ptos3: {
    Clean: {
      PM1: ["CL_A", "CL_B"],
      PM2: ["CL_X"]
    },
    Process: {
      PM1: ["PR_A", "PR_B"],
      PM2: ["PR_X", "PR_Y"]
    }
  },

  ptos4: {
    Clean: {
      PM1: ["CL4_A", "CL4_B"],
      PM2: ["CL4_X"]
    },
    Process: {
      PM1: ["PR4_A"],
      PM2: ["PR4_B"]
    }
  },

  ptos5: {
    Clean: {
      PM1: ["C5_A", "C5_B", "C5_C"],
      PM2: ["C5_X"]
    },
    Process: {
      PM1: ["P5_A"],
      PM2: ["P5_X", "P5_Y"]
    }
  }
};
// 레시피 템플릿 생성 함수
function makeRecipe(seed) {
  return {
    step1: { gas1: 3 + seed, gas2: 5, prs: `${3.5 + seed}t`, time: `${10 + seed}s` },
    step2: { gas1: 2 + seed, gas2: 4, prs: `${4.0}t`, time: `${9 + seed}s` },
    step3: { gas1: 1 + seed, gas2: 3, prs: `${4.2}t`, time: `${8 + seed}s` },
  };
}

export const mockRecipes = {
  ptos1: {
    Clean: {
      PM1: {
        CleanStep_A: makeRecipe(0),
        CleanStep_B: makeRecipe(1),
        CleanFast: makeRecipe(2),
      },
      PM2: {
        CleanPrep_X: makeRecipe(1),
        CleanPrep_Y: makeRecipe(2),
      }
    },
    Process: {
      PM1: {
        Proc_100: makeRecipe(1),
        Proc_150: makeRecipe(2),
        Proc_Heavy: makeRecipe(3),
      },
      PM2: {
        ProcX_1: makeRecipe(1),
        ProcX_2: makeRecipe(2),
      }
    }
  },

  ptos2: {
    Clean: {
      PM1: {
        C1_A: makeRecipe(0),
        C1_B: makeRecipe(1),
      },
      PM2: {
        C2_X: makeRecipe(2),
        C2_Y: makeRecipe(3),
      }
    },
    Process: {
      PM1: {
        P1_Main: makeRecipe(0),
        P1_Deep: makeRecipe(2),
      },
      PM2: {
        P2_Light: makeRecipe(1),
        P2_Fast: makeRecipe(3),
      }
    }
  },

  ptos3: {
    Clean: {
      PM1: {
        CL_A: makeRecipe(0),
        CL_B: makeRecipe(1)
      },
      PM2: {
        CL_X: makeRecipe(2)
      }
    },
    Process: {
      PM1: {
        PR_A: makeRecipe(0),
        PR_B: makeRecipe(1),
      },
      PM2: {
        PR_X: makeRecipe(2),
        PR_Y: makeRecipe(3),
      }
    }
  },

  ptos4: {
    Clean: {
      PM1: {
        CL4_A: makeRecipe(0),
        CL4_B: makeRecipe(1)
      },
      PM2: {
        CL4_X: makeRecipe(2)
      }
    },
    Process: {
      PM1: {
        PR4_A: makeRecipe(0),
      },
      PM2: {
        PR4_B: makeRecipe(3),
      }
    }
  },

  ptos5: {
    Clean: {
      PM1: {
        C5_A: makeRecipe(0),
        C5_B: makeRecipe(1),
        C5_C: makeRecipe(2),
      },
      PM2: {
        C5_X: makeRecipe(1),
      }
    },
    Process: {
      PM1: {
        P5_A: makeRecipe(0),
      },
      PM2: {
        P5_X: makeRecipe(2),
        P5_Y: makeRecipe(3),
      }
    }
  }
};
