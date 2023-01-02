import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Button } from 'antd';
import { WeaSwitch } from 'comsMobx';
import { WeaTop, WeaTab, WeaRightMenu, WeaReport, WeaFormItem, WeaNewScroll } from 'ecCom';

import { renderNoright, renderLoading } from '../util'; // 渲染form数据的方法：因为多个页面都会使用，所以抽的公共方法在util中

@inject('reportStore')
@observer
export default class Report extends React.Component {
  static defaultProps = {
    prefixCls: "wea-demo08"
  };

  componentWillMount() { // 初始化渲染页面
    const { reportStore: { doInit } } = this.props;
    doInit();
  }

  componentWillReceiveProps(nextProps) {
    const { reportStore } = this.props;
    if (this.props.location.key !== nextProps.location.key) { // 手动刷新、切换菜单 重新初始化
      reportStore.doInit();
    }
  }

  // 导出excel: 该功能需要后端更具自己的规则定义接口
  exportExcel = () => {
   const { reportStore: { outExcel, form } } = this.props;
    const params = form.getFormParams();
    outExcel(params);
  }

  // 搜索
  doSearch = () => {
    const { reportStore: { getDatas, form } } = this.props;
    const params = form.getFormParams();
    getDatas(params);
  }

  // 获得快捷搜索表单数据
  getSearchsAdQuick = () => {
    const { reportStore: { form, condition } } = this.props;
    const { isFormInit } = form;
    const arr = [];
    if (isFormInit) {
      toJS(condition)[0].items.map(field => {
        arr.push(
          <WeaFormItem
            label={`${field.label}`}
            labelCol={{span: `${field.labelcol}`}}
            wrapperCol={{span: `${field.fieldcol}`}}
          >
            <WeaSwitch fieldConfig={field} form={form} />
          </WeaFormItem>
        );
      });
    }
    return arr;
  }
  
  render() {
    const { reportStore, prefixCls } = this.props;
    const { loading, hasRight, form, datas } = reportStore;

    if (!hasRight && !loading) { // 无权限处理
      return renderNoright();
    }

    const rightMenu = [// 右键菜单
      {
        key: 'BTN_EXPORT',
        icon: <i className='icon-coms-export'/>,
        content : '导出Excel',
        onClick : this.exportExcel,
      },
    ];
    const collectParams = { // 收藏功能配置
      favname: '报表型列表',
      favouritetype: 1,
      objid: 0,
      link: 'wui/index.html#/ns_demo08/index',
      importantlevel: 1,
    };
    const adBtn = [ // 高级搜索内部按钮
      <Button type="primary" onClick={this.doSearch}>搜索</Button>,
      <Button type="ghost" onClick={() => form.resetForm()}>重置</Button>,
      <Button type="ghost" onClick={() => setShowSearchAd(false)}>取消</Button>,
    ];
    const btns = [ // 顶部操作按钮
      <Button type="primary" onClick={this.exportExcel}>导出Excel</Button>,
    ]

    return (
      <div className={prefixCls}>
        <WeaRightMenu
          datas={rightMenu} // 右键菜单
          collectParams={collectParams} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
        >
          <WeaTop
            title="报表型列表" // 文字
            icon={<i className='icon-coms-meeting' />} // 左侧图标
            iconBgcolor='#F14A2D' // 左侧图标背景色
            buttons={btns}
            showDropIcon={true} // 是否显示下拉按钮
            dropMenuDatas={rightMenu} // 下拉菜单（和页面的右键菜单相同）
            dropMenuProps={{ collectParams }} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
          >
            <WeaNewScroll height={'100%'}>
              <WeaTab
                searchsAdQuick={this.getSearchsAdQuick()} // 快捷搜索数据
                buttonsAdQuick={[<Button type="primary" onClick={this.doSearch}>搜索</Button>]} // 快捷搜索按钮
              />
              {loading ? renderLoading() : (
                <div className={`${prefixCls}-datas`}>
                  <WeaReport
                    datas={toJS(datas)}
                  />
                </div>
              )}
            </WeaNewScroll>
          </WeaTop>
        </WeaRightMenu>
      </div>
    )
  }
}