# Userhood conversion measurement

The primary conversion is a successfully delivered project brief. A WhatsApp click is a secondary conversion because it leaves the site before contact is confirmed.

Google Analytics loads only after a visitor chooses **Allow analytics**. Declining analytics prevents page-view and conversion events from being sent. Local development never loads the production analytics tag, which keeps team testing out of the property.

## Lead funnel

| Event | Fires when | Useful parameters |
| --- | --- | --- |
| `lead_form_open` | A visitor opens the project brief | `source` |
| `lead_form_start` | A visitor first changes or types into the form | `source` |
| `lead_project_type_select` | A visitor changes the engagement type | `source`, `project_type` |
| `lead_form_validation_error` | Native form validation blocks submission | `source`, `field` |
| `lead_form_submit_attempt` | A visitor submits a valid brief | `source`, `project_type`, `launch_window` |
| `generate_lead` | Web3Forms confirms successful delivery | `source`, `project_type`, `launch_window`, available UTM fields |
| `lead_form_error` | Delivery cannot complete | `source`, `reason` |
| `lead_form_close` | The brief is dismissed | `source`, `method`, `form_started`, `submission_status` |
| `whatsapp_click` | A visitor chooses a WhatsApp route | `source` and, in the modal, `originating_cta`, `project_type` |

Supporting navigation events are `selected_work_click`, `case_study_open`, and `services_click`.

## Attribution

The first available landing path and referrer are stored for the browser session. Any `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term` values are retained through client-side navigation. Attribution is appended to the delivered brief; campaign, source, and medium are also attached to `generate_lead`.

No name, email, company, or free-text brief is sent to Google Analytics.

## GA4 report to build

Create a funnel exploration in this order:

1. `lead_form_open`
2. `lead_form_start`
3. `lead_form_submit_attempt`
4. `generate_lead`

Break the funnel down by `source`, device category, and `project_type`. Review `lead_form_close.method`, `lead_form_validation_error.field`, and `lead_form_error.reason` beside it to identify the actual point of friction. Report `whatsapp_click` separately rather than treating it as a confirmed lead.

Conversion reports therefore describe consenting traffic, not every site visitor. Test one real production submission after every form-provider or environment change.
