import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Button } from 'antd';
import { WeaLogView } from 'comsMobx';
import { WeaTop, WeaRightMenu, WeaLocaleProvider, WeaNewScroll } from 'ecCom';

import { renderNoright, renderLoading, getSearchs } from '../util'; // 从util文件引入公共的方法

const getLabel = WeaLocaleProvider.getLabel;
const WeaLogViewComp = WeaLogView.Component;

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

  // 渲染右键菜单和顶部下拉菜单
  getRightMenu() {
    const { baseFormStore: { setLogVisible, saveForm } } = this.props;
    let btnArr = [
      {
        key: 'BTN_SAVE',
        icon: <i className='icon-coms-Preservation'/>,
        content : `${getLabel(86,'保存')}`,
        onClick : () => saveForm()
      },
      {
        key: 'log',
        content: getLabel(83, '日志'),
        icon: <i className='icon-coms-Print-log' />,
        onClick: () => setLogVisible(true),
      },]
    return btnArr;
  }
  
  render() {
    /*  页面渲染说明：
      1、判断是否无权限： 是显示无权限页面
      2、渲染form页面: 
        2-1: WeaRightMenu 右键菜单
        2-2: WeaTop: 顶部: 包括下拉菜单
        2-3: renderLoading: 加载数据中的loading效果(统一封装在util中)
        2-4: WeaNewScroll 顶部以下超长滚动处理
        2-5: 通过getSearchs方法渲染form
    */
    const { baseFormStore } = this.props;
    const { loading, hasRight, form, condition, logVisible, logStore, saveLoading, setLogVisible, saveForm } = baseFormStore; // 从后台取数据 和 方法
    
    if (!hasRight && !loading) { // 无权限处理
      return renderNoright();
    }

    const btns = [ // 顶部按钮
      <Button type='primary' loading={saveLoading} onClick={() => saveForm()}>保存</Button>,
    ];
    const collectParams = { // 收藏功能配置
      favname: '基础表单',
      favouritetype: 1,
      objid: 0,
      link: 'wui/index.html#/ns_demo01/index',
      importantlevel: 1,
    };
    return (
      <WeaRightMenu
        datas={this.getRightMenu()} // 右键菜单
        collectParams={collectParams} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
      >
        <WeaTop
          title="基础表单" // title
          icon={<i className='icon-coms-meeting' />} // 左侧图标
          iconBgcolor='#F14A2D' // 左侧图标背景色
          buttons={btns} // 顶部按钮: 这里是保存按钮，不需要可以不显示
          buttonSpace={10} // 按钮之间的间隔
          showDropIcon={true} // 是否显示右侧下拉按钮
          dropMenuDatas={this.getRightMenu()} // 下拉菜单（和页面的右键菜单相同）
          dropMenuProps={{ collectParams }} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
        >
          {loading ? renderLoading() :
            <WeaNewScroll height='100%'>
              {getSearchs(form, toJS(condition), 1)}
            </WeaNewScroll>
          }
          <WeaLogViewComp // 日志功能（一般后端的应用设置是需要的）
            visible={logVisible} // 日志弹框的显示隐藏
            onCancel={() => setLogVisible(false)} // 关闭日志弹框时的操作：设置logVisible属性为false
            logStore={logStore} // 日志的store
            logType="1" // 模块编码: 该参数要根据模块来给
            logSmallType="1" // 细分模块编码: 该参数要根据模块来给
          />
        </WeaTop>
      </WeaRightMenu>
    )
  }
}