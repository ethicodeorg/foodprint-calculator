import React, { useState } from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TabPanel from './TabPanel';
import theme from '../styles/theme';

const TranslateTabs = ({ selectedLang }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      fontFamily: theme.fontFamily.default,
    },
  }));
  const classes = useStyles();
  const handleChange = (_, newValue) => {
    setSelectedTab(newValue);
  };

  // Add the translation ids that need to be translated in the PR here:
  const changes = {
    frontPage: [],
    aboutPage: [],
    other: [
      'barley',
      'grapes',
      'brassicas',
      'mustard',
      'onions_leeks',
      'courgettes',
      'courgettes_dried',
      'fava_beans',
      'dill',
      'basil',
      'coriander',
      'cilantro',
      'cilantro_dried',
      'oregano',
      'pigeons',
      'wheat_rye',
      'almond_milk',
      'beef',
      'milk_chocolate',
      'oat_milk',
      'pasta',
      'rice_milk',
      'tea',
      'arugula_rocket',
      'bok_choy_pak_choi',
      'turnip_greens',
      'savoy_cabbage',
      'kohlrabi',
      'mizuna',
      'water_cress',
      'romanesco_broccoli',
      'collard_greens',
      'belgian_endive',
      'radicchio',
      'wild_chicory',
      'swiss_chard',
      'artichokes',
      'asparagus',
      'dandelion_greens',
      'corn_salad_valerianella',
      'thistle',
      'sorrel',
      'escarole',
      'catalonian_chicory_puntarelle',
      'okra',
      'tomatillos',
      'friggitelli_peppers',
      'bamboo_shoots',
      'moringa_leaves',
      'borage',
      'jerusalem_artichokes_sunchokes',
      'celeriacs',
      'taro_roots',
      'tigernut_chufa',
      'beets',
      'daikon',
      'horseradish',
      'parsley_root',
      'chicory_root',
      'dandelion_root',
      'redcurrants',
      'blackcurrants',
      'mulberries',
      'gooseberries',
      'jostaberries',
      'blackberries',
      'honeyberries',
      'goji_berries',
      'açaí_berries',
      'cranberries',
      'aronia_berries',
      'elderberries',
      'barberries',
      'amla_berries',
      'plantains',
      'jackfruits',
      'durians',
      'guavas',
      'mangosteens',
      'starfruits_carambolas',
      'tamarind',
      'rambutan',
      'sapote',
      'sapodilla',
      'dragon_fruit_pitaya',
      'pomelo',
      'papaya',
      'watermelon',
      'apricots',
      'medlars',
      'nectarines',
      'cherimoya_annona_cherimola',
      'sugar_apple_annona_squamosa',
      'kumquat',
      'clementines',
      'chayote',
      'kiwano',
      'atemoya',
      'soursop_graviola',
      'langsats',
      'loquat',
      'noni_fruit',
      'prickly_pear',
      'longans',
      'cherries',
      'bergamot',
      'acerola',
      'jabuticaba',
      'mangaba',
      'cupuaçu',
      'guarana',
      'genipapo',
      'savory',
      'lemon_balm',
      'stevia',
      'marjoram',
      'bay_leaf',
      'hyssop',
      'pepper',
      'turmeric',
      'mint',
      'juniper_berries',
      'nutmeg',
      'cumin',
      'saffron',
      'ginseng',
      'cloves',
      'tarragon',
      'wild_fennel',
      'mustard_seeds',
      'cardamom',
      'cinnammon',
      'fenugreek',
      'licorice',
      'vanille',
      'curry ',
      'lemon_pepper',
      'black_pepper',
      'borlotti_beans_cranberry_beans',
      'cannellini_beans',
      'grass_peas_cicerchie',
      'edamame_beans',
      'lima_beans',
      'mung_beans',
      'adzuki_beans',
      'cashews',
      'macadamia_nuts',
      'pine_nuts',
      'acorns',
      'beech_nuts',
      'kola_nuts',
      'coconut',
      'trout_farmed',
      'cod_farmed',
      'eel_farmed',
      'sturgeon_farmed',
      'seabass_farmed',
      'sea_bream_farmed',
      'milkfish_farmed',
      'tuna_farmed',
      'goldfish_farmed',
      'corvina_fish_farmed',
      'lobstersz',
      'crabs',
      'octopus',
      'mortadella',
      'pig_feet',
      'pork_jowl',
      'salami_pig',
      'wurstel',
      'pork_steak',
      'pork_tenderloin',
      'pork_loin',
      'pork_spareribs',
      'speck',
      'salami_beef',
      'bresaola_beef',
      'roast_beef',
      'florentine_steak',
      'beef_tenderloin',
      'sirloin_steak',
      'beef_ribs',
      'chicken_breast',
      'chicken_thighs',
      'chicken_nuggets',
      'chicken_wings',
      'wurstel_chicken',
      'turkey_breast',
      'geese',
      'ducks',
      'guinea_fowls',
      'pheasant',
      'ostriches',
      'gorgonzola',
      'pecorino_cheese',
      'goat_cheese',
      'stracchino_crescenza_cheese',
      'brie_cheese',
      'philadelphia_cream_cheese',
      'caciotta_cheese',
      'emmental',
      'camembert',
      'cottage_cheese',
      'gouda_cheese',
      'gruyere',
      'mascarpone',
      'roquefort',
      'stilton',
      'wensleydale_cheese',
      'jarlsberg_cheese',
      'havarti_cheese',
      'caciocavallo_cheese',
      'provola_provolone_cheese',
      'processed_cheese_slices ',
      'manchego_cheese',
      'epoisses_cheese',
      'muenster_cheese',
      'edam_cheese ',
      'colby_cheese',
      'butter',
      'ghee_butter',
      'cream',
      'yogurt',
      'unsupported_ingredient',
      'other_berries',
      'edit_ingredient',
      'remove_ingredient_sure',
    ],
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={selectedTab} onChange={handleChange}>
          <Tab
            label={`Front page (${changes.frontPage.length})`}
            id="simple-tab-0"
            aria-controls="simple-tabpanel-0"
            classes={classes}
          />
          <Tab
            label={`About page (${changes.aboutPage.length})`}
            id="simple-tab-1"
            aria-controls="simple-tabpanel-1"
            classes={classes}
          />
          <Tab
            label={`Other changes (${changes.other.length})`}
            id="simple-tab-2"
            aria-controls="simple-tabpanel-2"
            classes={classes}
          />
        </Tabs>
        <TabPanel
          value={selectedTab}
          index={0}
          selectedLang={selectedLang}
          changes={changes.frontPage}
        />
        <TabPanel
          value={selectedTab}
          index={1}
          selectedLang={selectedLang}
          changes={changes.aboutPage}
        />
        <TabPanel
          value={selectedTab}
          index={2}
          selectedLang={selectedLang}
          changes={changes.other}
        />
      </AppBar>
    </div>
  );
};

export default TranslateTabs;
