
const ENTITY_TYPE = {
  BIRD: 'BIRD',
  ENEMY: 'ENEMY',
  OBSTACLE: 'OBSTACLE',
  STATIC: 'STATIC',
};

const ENTITY_SUBTYPE = {
  RED: 'RED',
  CHUCK: 'CHUCK',
  ICE: 'ICE',
  WOOD: 'WOOD',
  STONE: 'STONE',
  ARMORED_PIG: 'ARMORED_PIG',
  UNARMORED_PIG: 'UNARMORED_PIG',
};

const ENTITY_KEY_MAPPER = {
  BIRD: 'birds',
  ENEMY: 'pigs',
  OBSTACLE: 'blocks',
};

const SCORE_SUBTYPE_MAPPER = {
  UNARMORED_PIG: 1000,
  ARMORED_PIG: 2000,
  WOOD: 200,
  STONE: 300,
  ICE: 100,
};

const LEVEL_SEED_MAPPER = {
  1: PATH_SEEDER_LVL_1,
  2: PATH_SEEDER_LVL_2,
  3: PATH_SEEDER_LVL_3,
  4: PATH_SEEDER_LVL_4,
  5: PATH_SEEDER_LVL_5,
};

const SUBTYPE_IMAGE_MAPPER = {
  RED: IMAGE_RED,
  CHUCK: IMAGE_CHUCK,
  ICE: IMAGE_ICE_BLOCK,
  WOOD: IMAGE_WOOD_BLOCK,
  STONE: IMAGE_STONE_BLOCK,
  ARMORED_PIG: IMAGE_PIG_ARMORED,
  UNARMORED_PIG: IMAGE_PIG,
};

const PIG_HP_MAPPER = {
  ARMORED_PIG: 2,
  UNARMORED_PIG: 1,
}
