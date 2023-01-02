import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';
import { WeaRightMenu, WeaTop, WeaNewScroll, WeaEchart, WeaRadioGroup } from 'ecCom';

import { renderLoading, renderNoright, renderNoData } from '../util';

@inject('chartStore')
@observer
class Chart extends React.Component {
  static defaultProps = {
    prefixCls: 'wea-demo07' // 当前页面的基本class名
  }

  componentWillMount() { // 初始化渲染页面
    const { chartStore: { doInit } } = this.props;
    doInit();
  }

  componentWillReceiveProps(nextProps) {
    const { chartStore } = this.props;
    if (this.props.location.key !== nextProps.location.key) { // 手动刷新、切换菜单 重新初始化
      chartStore.doInit();
    }
  }

  render() {
    const { chartStore, prefixCls } = this.props;
    const { hasRight, loading, config, categories, series, getEchartConfig } = chartStore;

    if (!hasRight && !loading) { // 无权限处理
      return renderNoright();
    }

    const collectParams = { // 收藏功能配置
      favname: '报表型图表',
      favouritetype: 1,
      objid: 0,
      link: 'wui/index.html#/ns_demo07/index',
      importantlevel: 1,
    };
    const option = { // echats 的选项, 具体参考ECharts官方文档
      tooltip: {},
      legend: {
          data:['销量']
      },
      xAxis: {
          data: toJS(categories)
      },
      yAxis: {},
      series: [{
          name: '销量',
          type: 'bar',
          data: toJS(series)
      }],
      color: ['#00A9FF'],
    }

    return (
      <div className={prefixCls}>
        <WeaRightMenu
          datas={[]} // 右键菜单
          collectParams={collectParams} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
        >
          <WeaTop
            title="报表型图表" // title
            icon={<i className='icon-coms-meeting' />} // 左侧图标
            iconBgcolor='#F14A2D' // 左侧图标背景色
            showDropIcon={true} // 是否显示右侧下拉按钮
            dropMenuDatas={[]} // 下拉菜单（和页面的右键菜单相同）
            dropMenuProps={{ collectParams }} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
          >
            <WeaNewScroll height='100%'>
              <div className={`${prefixCls}-radioG`}>
                <WeaRadioGroup
                  config={config}
                  onChange={params=> getEchartConfig(params)}
                />
              </div>
              <div className={`${prefixCls}-echart`}>
                <div className={`${prefixCls}-echart-head`}>EChart示列图表</div>
                <div className={`${prefixCls}-echart-content`}>
                  {loading ? renderLoading() : !series ? renderNoData() : 
                    <WeaEchart
                      ref={ref => this.chartRef = ref}
                      option={option}
                      useDefault={false}
                    />
                  }
                </div>
              </div>
            </WeaNewScroll>
          </WeaTop>
        </WeaRightMenu>
      </div>
    );
  }
}

export default Chart;