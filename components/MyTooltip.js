import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import theme from '../styles/theme';

const MyTooltip = withStyles(() => ({
  tooltip: {
    padding: '10px',
    borderRadius: '4px',
    backgroundColor: 'rgba(34, 34, 34, 0.9)',
    fontFamily: theme.fontFamily.default,
    fontSize: 12,
    textAlign: 'center',
  },
  arrow: {
    color: 'rgba(34, 34, 34, 0.9)',
  },
}))(Tooltip);

export default MyTooltip;
