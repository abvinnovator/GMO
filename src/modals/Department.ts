export interface Department {
    department: string;
    sub_departments: string[];
  }
  
  export const departmentData: Department[] = [
    {
      department: "customer_service",
      sub_departments: [
        "support",
        "customer_success"
      ]
    },
    {
      department: "design",
      sub_departments: [
        "graphic_design",
        "product_design",
        "web_design"
      ]
    }
  ];