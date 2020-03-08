import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core/';

const StyledButton = withStyles({
    label: {
      textTransform: 'initial',
    }
})((Button));
export default StyledButton;