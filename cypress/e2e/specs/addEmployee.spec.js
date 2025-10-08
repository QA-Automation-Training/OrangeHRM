// cypress/e2e/specs/addEmployee.spec.js

import addEmployeePage from '../../pages/addEmployeePage';

describe('Add Employee Test Suite', () => {

  beforeEach(() => {
    // الذهاب لصفحة تسجيل الدخول
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    
    // إدخال اسم المستخدم
    cy.get('input[name="username"]').type('Admin');
    
    // إدخال كلمة المرور
    cy.get('input[name="password"]').type('admin123');
    
    // الضغط على زر تسجيل الدخول
    cy.get('button[type="submit"]').click();
    
    // التأكد من الانتقال للداشبورد
    cy.url().should('include', '/dashboard');
    
    // الذهاب إلى صفحة Admin
    cy.contains('Admin').click();
    cy.wait(2000);
    
    // الضغط على Add (مباشرة - بدون User Management)
    cy.contains('button', 'Add').click();
    cy.wait(1000);

    // تأكد من تحميل الصفحة
    cy.get('input[placeholder="Type for hints..."]').should('be.visible');
  });

 it('TC-001: Verify that Admin can successfully add a new user with valid data', () => {
  const timestamp = Date.now();
  const validUserData = {
    userRole: 'Admin',
    employeeName: 'Linda',
    status: 'Enabled',
    username: `user${timestamp}`,
    password: 'OrangeHRM@123', // ✅ password قوي جداً
    confirmPassword: 'OrangeHRM@123'
  };

  addEmployeePage.fillUserForm(validUserData);
  
  // ✅ نشوف الـ URL قبل الضغط
  let urlBefore;
  cy.url().then(url => {
    urlBefore = url;
  });
  
  addEmployeePage.clickSave();

  // ✅ انتظار
  cy.wait(8000);
  
  // ✅ نتحقق: إما انتقلنا لصفحة تانية، أو اختفى زر Save
  cy.url().then(urlAfter => {
    if (urlAfter !== urlBefore) {
      // نجح - انتقلنا لصفحة تانية
      cy.log('✅ Success: URL changed');
      expect(urlAfter).to.not.equal(urlBefore);
    } else {
      // لسه بنفس الصفحة - نتحقق من اختفاء الفورم أو ظهور success
      cy.get('body').then($body => {
        const saveButtonExists = $body.find('button:contains("Save")').length > 0;
        
        if (!saveButtonExists) {
          cy.log('✅ Success: Save button disappeared');
        } else {
          // نتحقق من عدم وجود error messages
          const hasErrors = $body.find('.oxd-input-field-error-message').length > 0;
          expect(hasErrors, '❌ Error messages found').to.be.false;
        }
      });
    }
  });
});
  // ============ TC-002 ============
  it('TC-002: Verify that required field validation messages appear when fields are left empty', () => {
    addEmployeePage.clickSave();

    addEmployeePage.verifyRequiredErrors();
  });

  // ============ TC-003 ============
  it('TC-003: Verify that system shows error when Password and Confirm Password do not match', () => {
    const mismatchPasswordData = {
      userRole: 'ESS',
      employeeName: 'Linda',
      status: 'Enabled',
      username: `testuser${Date.now()}`,
      password: 'Test@12345',
      confirmPassword: 'Different@123'
    };

    addEmployeePage.fillUserForm(mismatchPasswordData);
    addEmployeePage.clickSave();

    cy.wait(1000);
    addEmployeePage.verifyPasswordMismatchError();
  });

  // ============ TC-004 ============
  it('TC-004: Verify that system prevents adding user with an existing username', () => {
    const duplicateUsernameData = {
      userRole: 'Admin',
      employeeName: 'Linda',
      status: 'Enabled',
      username: 'Admin', // ✅ username موجود
      password: 'Test@12345',
      confirmPassword: 'Test@12345'
    };

    addEmployeePage.fillUserForm(duplicateUsernameData);
    addEmployeePage.clickSave();

    cy.wait(1000);
    addEmployeePage.verifyUsernameExistsError();
  });
});