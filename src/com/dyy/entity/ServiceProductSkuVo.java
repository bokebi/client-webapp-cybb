package com.dyy.entity;

/**
 * 
  * 描述:<p></p>
  * @ClassName: 商品查询实体类
  * @author pengwei
  * @date 2017年2月21日 下午4:21:31
  *
 */
public class ServiceProductSkuVo{
	private String productId;
	private String serviceId;
	private String areaId;
	private String nature;
	private String periodNumber;
	private String attributeValueIds;
	
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getServiceId() {
		return serviceId;
	}
	public void setServiceId(String serviceId) {
		this.serviceId = serviceId;
	}
	public String getAreaId() {
		return areaId;
	}
	public void setAreaId(String areaId) {
		this.areaId = areaId;
	}
	public String getNature() {
		return nature;
	}
	public void setNature(String nature) {
		this.nature = nature;
	}
	public String getPeriodNumber() {
		return periodNumber;
	}
	public void setPeriodNumber(String periodNumber) {
		this.periodNumber = periodNumber;
	}
	public String getAttributeValueIds() {
		return attributeValueIds;
	}
	public void setAttributeValueIds(String attributeValueIds) {
		this.attributeValueIds = attributeValueIds;
	}
}