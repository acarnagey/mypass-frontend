import React, {Component, Fragment} from 'react';
import './ProgressIndicator.scss';

interface ProgressIndicatorProps {
  isFullscreen?: boolean;
}

class ProgressIndicator extends Component<ProgressIndicatorProps> {
  renderCircularProgressIndicator() {
    return (
      <svg className="circular">
        <circle
          className="path"
          cx="24"
          cy="24"
          r="19"
          fill="none"
          strokeWidth="5"
          strokeMiterlimit="10"
        />
      </svg>
    );
  }

  render() {
    const { isFullscreen } = { ...this.props };
    return (
      <Fragment>
        {isFullscreen &&
          <div style={{position: 'absolute', display: 'flex', alignItems: 'center',
            justifyContent: 'center', background: 'rgba(255,255,255,0.7)', width: '100%', height: '100%',
            zIndex:1}}>
            {this.renderCircularProgressIndicator()}
          </div>
        }
        {!isFullscreen && this.renderCircularProgressIndicator()}
      </Fragment>

    );
  }
}

export default ProgressIndicator;
