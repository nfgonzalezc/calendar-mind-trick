import { newE2EPage } from '@stencil/core/testing';

describe('adl-calendar', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<adl-calendar></adl-calendar>');
    const element = await page.find('adl-calendar');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<adl-calendar></adl-calendar>');
    const component = await page.find('adl-calendar');
    const element = await page.find('adl-calendar >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
