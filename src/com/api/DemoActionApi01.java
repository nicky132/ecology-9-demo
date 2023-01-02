package com.api;

import com.engine.demo.demo01.web.DemoAction01;

import javax.ws.rs.Path;

import weaver.conn.RecordSet;
import weaver.conn.RecordSetDataSource;

/*
 * @Author      :wyl
 * @Date        :2019/4/19  14:56
 * @Version 1.0 :
 * @Description :
 **/
@Path("/demo01")
public class DemoActionApi01 extends DemoAction01 {
    RecordSet rs = new RecordSet();
    RecordSetDataSource rsds = new RecordSetDataSource("ss");

    public void test() {

    }
}
