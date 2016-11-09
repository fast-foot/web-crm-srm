from openpyxl import Workbook
import os


class Service(object):

    def write_sheet(self, data: dict, file_name: str):
        wb = Workbook()

        ws1 = wb.active
        ws1.title = 'Contact Details'

        ws1.merge_cells('A1:B1')
        ws1['A1'] = 'Contact Information'

        ws1.merge_cells('D1:E1')
        ws1['D1'] = 'Manager Information'

        ws1.merge_cells('G1:H1')
        ws1['D1'] = 'Extra Information'

        for i, (key, value) in enumerate(data['contactDetails'].items()):
            ws1.cell(row=(i + 2), column=1).value = key
            ws1.cell(row=(i + 2), column=2).value = value

        for i, (key, value) in enumerate(data['managerDetails'].items()):
            ws1.cell(row=(i + 2), column=4).value = key
            ws1.cell(row=(i + 2), column=5).value = value

        for i, (key, value) in enumerate(data['extraDetails'].items()):
            ws1.cell(row=(i + 2), column=7).value = key
            ws1.cell(row=(i + 2), column=8).value = value

        ws2 = wb.create_sheet(title="Products Information")
        start_indent = 1
        end_indent = 0

        for i, product in enumerate(data['products']):
            end_indent += 10

            ws2.merge_cells('A{}:A{}'.format(start_indent, end_indent))
            ws2['A1'] = str(i + 1)

            for j, (key, value) in enumerate(product['details'].items()):
                ws2.cell(row=(j + 1 + start_indent), column=2).value = key
                ws2.cell(row=(j + 1 + start_indent), column=3).value = value

                self._write_strategic_plan(ws2, product['plans']['strategic'])

            start_indent += 12
            end_indent += 14

        wb.save(filename=file_name)

    def _write_strategic_plan(self, ws, data):
        start_column = 5
        for year, quarters_data in data.items():
            if type(year) == str and year == 'total':
                continue
            cols_to_split = len(quarters_data)

            ws.merge_cells(start_row=1, end_row=1, start_column=5, end_column=5 + cols_to_split)
            ws.cell(row=1, column=start_column, value=year)

            star_quarter_col = start_column
            for quarter, value in sorted(quarters_data.items()) if isinstance(quarters_data, dict) else []:
                ws.cell(row=2, column=star_quarter_col, value=quarter)
                ws.cell(row=3, column=star_quarter_col, value=value)
                star_quarter_col += 1

            start_column += cols_to_split

    def years_count(self, data):
        return len([v for v in data.values() if type(v) == dict])