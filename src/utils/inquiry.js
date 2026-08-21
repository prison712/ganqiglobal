export function validateInquiry(values = {}) {
  const errors = {}
  if (!values.company?.trim()) errors.company = 'required'
  if (!values.contact?.trim()) errors.contact = 'required'
  if (!values.phone?.trim()) errors.phone = 'required'
  else if (values.phone.replace(/\D/g, '').length < 6) errors.phone = 'invalid'
  if (!values.need?.trim()) errors.need = 'required'
  return errors
}
