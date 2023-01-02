import React from 'react';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

import { Button } from 'antd';
import { WeaTableNew } from 'comsMobx';
import { WeaTop, WeaTab, WeaRightMenu } from 'ecCom';

import { renderNoright, getSearchs } from '../util'; // 渲染form数据的方法：因为多个页面都会使用，所以抽的公共方法在util中

const WeaTable = WeaTableNew.WeaTable;

@inject('baseTableStore')
@observer
export default class BaseTabTable extends React.Component {
  componentWillMount() { // 初始化渲染页面
    const { baseTableStore: { doInit } } = this.props;
    doInit();
  }

  componentWillReceiveProps(nextProps) {
    const { baseTableStore } = this.props;
    if (this.props.location.key !== nextProps.location.key) { // 手动刷新、切换菜单 重新初始化
      baseTableStore.doInit();
    }
  }

  // tab change事件
  onChange = (v) => {
    const { baseTableStore: { form, getTableDatas } } = this.props;
    const formParams = form.getFormParams();
    form.updateFields({ state: { value: v } });
    getTableDatas({
      ...formParams,
      state: v,
    });
  }

  showColumn = () => {
    const { baseTableStore: { tableStore } } = this.props;
    tableStore.setColSetVisible(true);
    tableStore.tableColSet(true);
  }
  
  render() {
    const { baseTableStore } = this.props;
    const { loading, hasRight, form, condition, tableStore, showSearchAd, getTableDatas, doSearch, setShowSearchAd } = baseTableStore;

    if (!hasRight && !loading) { // 无权限处理
      return renderNoright();
    }

    const rightMenu = [// 右键菜单
      {
        key: 'BTN_COLUMN',
        icon: <i className='icon-coms-Custom'/>,
        content : '显示列定制',
        onClick : this.showColumn
      },
    ];
    const collectParams = { // 收藏功能配置
      favname: '基础列表(带Tab页)',
      favouritetype: 1,
      objid: 0,
      link: 'wui/index.html#/ns_demo04/index',
      importantlevel: 1,
    };
    const adBtn = [ // 高级搜索内部按钮
      <Button type="primary" onClick={doSearch}>搜索</Button>,
      <Button type="ghost" onClick={() => form.resetForm()}>重置</Button>,
      <Button type="ghost" onClick={() => setShowSearchAd(false)}>取消</Button>,
    ];
    const tabs = [ // tab页数据
      {
        groupid: 'all',
        title: '全部',
        viewcondition: '0',
      },
      {
        groupid: 'start',
        title: '开始',
        viewcondition: '1',
      },
      {
        groupid: 'flow',
        title: '流转',
        viewcondition: '2',
      },
      {
        groupid: 'return',
        title: '撤销',
        viewcondition: '3',
      },
      {
        groupid: 'over',
        title: '结束',
        viewcondition: '4',
      },
    ];

    return (
      <WeaRightMenu
        datas={rightMenu} // 右键菜单
        collectParams={collectParams} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
      >
        <WeaTop
          title="基础列表(带Tab页)" // 文字
          icon={<i className='icon-coms-meeting' />} // 左侧图标
          iconBgcolor='#F14A2D' // 左侧图标背景色
          showDropIcon={true} // 是否显示下拉按钮
          dropMenuDatas={rightMenu} // 下拉菜单（和页面的右键菜单相同）
          dropMenuProps={{ collectParams }} // 收藏功能: 配置之后显示 收藏、帮助、显示页面地址 这3个功能
          loading={loading} // 头部加载进度条
        >
          <WeaTab
            datas={tabs} // tab页数据
            keyParam="viewcondition"  //主键
            countParam="groupid" //数量
            selectedKey={form.getFormParams().state || '0'} // 当前选中的tab key -- 这里和高级搜索的状态对应
            onChange={this.onChange} // 切换tab页的时候，高级搜索表单对应的值更改，table数据重新刷新
            searchType={['base', 'advanced']} // base：基础搜索框 advanced：显示高级搜索按钮
            showSearchAd={showSearchAd} // 是否展开高级搜索面板
            setShowSearchAd={bool => setShowSearchAd(bool)} //高级搜索面板受控
            searchsAd={getSearchs(form, toJS(condition), 2)} // 高级搜索内部数据
            buttonsAd={adBtn} // 高级搜索内部按钮
            onSearch={getTableDatas} // 点搜索按钮时的回调
            onSearchChange={v => form.updateFields({ requestname: v })} // 在搜索框中输入的文字改变时的回调: 这里需要同步高级搜索和外部搜索框的值
            searchsBaseValue={form.getFormParams().requestname} // 外部input搜索值受控: 这里和高级搜索的requestname同步
          />
          <WeaTable // table内部做了loading加载处理，页面就不需要再加了
            comsWeaTableStore={tableStore} // table store
            hasOrder={true} // 是否启用排序
            needScroll={true} // 是否启用table内部列表滚动，将自适应到父级高度
          />
        </WeaTop>
      </WeaRightMenu>
    )
  }
}