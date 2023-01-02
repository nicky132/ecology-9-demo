package com.engine.demo.demo08.service.impl;

import com.engine.common.util.ParamUtil;
import com.engine.core.impl.Service;
import com.engine.demo.demo08.cmd.WeaReportConditionDemoCmd;
import com.engine.demo.demo08.cmd.WeaReportDemoCmd;
import com.engine.demo.demo08.service.DemoService08;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.ss.usermodel.BorderStyle;
import weaver.general.BaseBean;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/*
 * @Author      :wyl
 * @Date        :2019/4/23  10:14
 * @Version 1.0 :
 * @Description :
 **/
public class DemoServiceImpl08 extends Service implements DemoService08 {
    @Override
    public Map<String, Object> WeaReportDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeaReportDemoCmd(user,params));
    }

    @Override
    public Map<String, Object> WeaReportConditionDemo(Map<String, Object> params) {
        return commandExecutor.execute(new WeaReportConditionDemoCmd(user,params));
    }

    @Override
    public InputStream WeaReportOutExcel(HttpServletRequest request, HttpServletResponse response) {
        HSSFWorkbook wb = new HSSFWorkbook();
        HSSFSheet sheet = wb.createSheet();
        HSSFRow row = null;
        HSSFCell cell = null;
        //样式
        HSSFCellStyle sheetStyle = wb.createCellStyle();
        sheetStyle.setWrapText(true);
        sheetStyle.setBorderBottom(BorderStyle.THIN);
        sheetStyle.setBorderRight(BorderStyle.THIN);
        sheetStyle.setBorderTop(BorderStyle.THIN);
        sheetStyle.setBorderLeft(BorderStyle.THIN);

        try{
            //创建标题
            //因为这里是前端固定的表头,所以后台手动添加
            HSSFRow row0=sheet.createRow((short)0);
            cell=row0.createCell(0);
            cell.setCellValue("");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(1);
            cell.setCellValue("1月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(2);
            cell.setCellValue("2月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(3);
            cell.setCellValue("3月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(4);
            cell.setCellValue("4月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(5);
            cell.setCellValue("5月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(6);
            cell.setCellValue("6月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(7);
            cell.setCellValue("7月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(8);
            cell.setCellValue("8月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(9);
            cell.setCellValue("9月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(10);
            cell.setCellValue("10月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(11);
            cell.setCellValue("11月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(12);
            cell.setCellValue("12月");
            cell.setCellStyle(sheetStyle);

            cell=row0.createCell(13);
            cell.setCellValue("合计");
            cell.setCellStyle(sheetStyle);

            //从dao获取报表数据
            Map<String, Object> dataMap = WeaReportDemo(ParamUtil.request2Map(request));
            List data = (List) dataMap.get("data");
            Map<String, Object> map=(Map<String, Object>) data.get(0);
            List<Map> child =(List<Map>) map.get("child");
            List<String> data1 =(List<String>)map.get("data");
            HSSFRow rown=sheet.createRow(1);
            for (int i=0;i<data1.size();i++){
                cell=rown.createCell(i);
                cell.setCellValue(data1.get(i));
                cell.setCellStyle(sheetStyle);
            }
            for (int i=0;i<child.size();i++){
                HSSFRow rowchild=sheet.createRow(2+i);
                List<String> data2 =(List<String>) child.get(i).get("data");
                for(int j=0;j<data2.size();j++){
                    cell=rowchild.createCell(j);
                    cell.setCellValue(data2.get(j));
                    cell.setCellStyle(sheetStyle);
                }

            }


            //将workbook转换为流的形式
            ByteArrayOutputStream os = new ByteArrayOutputStream();
            wb.write(os);
            InputStream input = new ByteArrayInputStream(os.toByteArray());
            return input;

        }catch (Exception e){
            new BaseBean().writeLog("导出excel报错,错误信息为:"+e.getMessage());
        }


        return null;
    }


}
