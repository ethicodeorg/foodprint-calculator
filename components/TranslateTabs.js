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
    aboutPage: ['eutrophying_emissions_rda', 'eutrophying_emissions_method'],
    other: [
      'more',
      'less',
      'one_pie',
      'des_tooltip_example_pie',
      'des_tooltip_land_use',
      'des_tooltip_greenhouse_gas_emissions',
      'des_tooltip_water_withdrawals',
      'des_tooltip_eutrophying_emissions',
      'servings_tooltip',
      'tooltip_all_meals',
      'tooltip_compare',
      'warning_not_logged_in',
      'edit_ingredient',
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
