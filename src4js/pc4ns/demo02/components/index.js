import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Button } from 'antd';
import { WeaTop, WeaRightMenu, WeaNewScroll } from 'ecCom';

import { renderNoright, renderLoading, getSearchs } from '../util'; // 从util文件引入公共的方法

@inject('baseFormStore')
@observer
export default class BaseForm extends React.Component {
  componentWillMount() { // 初始化渲染页面
    const { baseFormStore: { doInit } } = this.props;
    doInit();
  }

  componentWillReceiveProps(nextProps) {
    const { baseFormStore: { doInit } } = this.props;
    if (this.props.location.key !== nextProps.location.key) { // 手动刷新、切换菜单 重新初始化
      doInit();
    }
  }
  
  render() {
    const { baseFormStore } = this.props;
    const { loading, hasRight, form, condition, logVisible, logStore, saveLoading, setLogVisible, saveForm } = baseFormStore; // 从后台取数据 和 方法
    
    if (!hasRight && !loading) { // 无权限处理
      return renderNoright();
    }

    const collectParams = { // 收藏功能配置
      favname: '基础表单-两列布局',
      favouritetype: 1,
      objid: 0,
      link: 'wui/index.html#/ns_demo02/index',
      importantlevel: 1,
    };
    return (
      <WeaRightMenu
        datas={[]} // 右键菜单
        collectParams={collectParams} // 收藏功能: 配置之后显示 收藏、帮助
      >
        <WeaTop
          title="基础表单-两列布局" // title
          icon={<i className='icon-coms-meeting' />} // 左侧图标
          iconBgcolor='#F14A2D' // 左侧图标背景色
          showDropIcon={true} // 是否显示右侧下拉按钮
          dropMenuProps={{ collectParams }} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
        >
          {loading ? renderLoading() :
            <WeaNewScroll height='100%'>
              {getSearchs(form, toJS(condition), 2)}
            </WeaNewScroll>
          }
        </WeaTop>
      </WeaRightMenu>
    )
  }
}