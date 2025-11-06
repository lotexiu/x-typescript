import { NextRequest, userAgent } from "next/server";
import { UserAgent } from "./auth/types";

export interface RequestClientInfo {
  ip: string;
  ips: string[];
  userAgent: UserAgent;
  acceptLanguage: string;
  referer: string;
  host: string;
  method: string;
  url: string;
  forwardedProto: string[];
}

export function getIPFromRequest(request: NextRequest): string {
  const { headers } = request;
  let ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || 'unknown';
  if (Array.isArray(ip)) {
    ip = ip[0];
  }
  return ip;
}

export function getRequestClientInfo(request: NextRequest): RequestClientInfo {
  const headers = request.headers;
  const ip = getIPFromRequest(request);
  let ips = headers.get('x-forwarded-for') || [''];
  if (typeof ips === 'string') ips = ips.split(',').map(ip => ip.trim());
  let forwardedProto= headers.get('x-forwarded-proto') || ['unknown'];
  if (typeof forwardedProto == 'string') forwardedProto = forwardedProto.split(',').map(proto => proto.trim());

  const info: RequestClientInfo = {
    ip: ip,
    ips,
    userAgent: userAgent(request),
    acceptLanguage: headers.get('accept-language') || 'desconhecido',
    referer: headers.get('referer') || 'desconhecido',
    host: headers.get('host') || 'desconhecido',
    method: (request as any).method || 'POST',
    url: (request as any).url || 'desconhecida',
    forwardedProto: forwardedProto
  };

  return info;
}
