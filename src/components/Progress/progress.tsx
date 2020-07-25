import React, { FC } from 'react'
import { ThemeProps } from '../Icon/icon'

export interface ProgressProps {
  /**进度百分比 */
  percent: number;
  /**进度条高度 */
  strokeHeight?: number;
  /**是否显示文字 */
  showText?: boolean;
  /**自定义样式 */
  styles?: React.CSSProperties;
  /**主题色 */
  theme?: ThemeProps;
}

export const Progress: FC<ProgressProps> = (props) => {
  const {
    percent,
    strokeHeight,
    showText,
    styles,
    theme,
  } = props
  return (
    <div className="guo-progress-bar" style={styles}>
      <div className="guo-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`guo-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  )
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary',
};

export default Progress;