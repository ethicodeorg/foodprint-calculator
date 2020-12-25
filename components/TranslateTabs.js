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
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const changes = {
    frontPage: ['start', 'slogan'],
    aboutPage: [],
    other: ['transport_mode', 'transport_type'],
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
