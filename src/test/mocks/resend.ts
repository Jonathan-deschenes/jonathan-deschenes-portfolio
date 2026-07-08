import { vi } from "vitest";

// Vitest hoists `vi.mock` calls to the top of the file that calls them, so
// this factory can't be re-exported and used via a single shared `vi.mock`
// call — each consuming test file must call:
//
//   import { sendMock, resendModuleMock } from "../../../test/mocks/resend";
//   vi.mock("resend", () => resendModuleMock);
//
// `sendMock` is the shared `emails.send` spy used to configure return values
// and assert call arguments.

export const sendMock = vi.fn();

export const resendModuleMock = {
  Resend: vi.fn().mockImplementation(function MockResend() {
    return { emails: { send: sendMock } };
  }),
};

export function mockResendSuccess() {
  sendMock.mockResolvedValue({ data: { id: "test-email-id" }, error: null });
}

export function mockResendFailure(message = "Resend down") {
  sendMock.mockResolvedValue({ data: null, error: { message } });
}
