/*! power by kodcloud ver4.33(2018-08-22) [build 1534939772860] */
define("app/src/user/main", ["lib/jquery-lib", "lib/util", "lib/artDialog/jquery-artDialog", "../../common/core", "../../common/tpl/upload.html", "../../common/tpl/formMake.html", "../../common/core.tools", "../../common/core.upload", "../../common/core.api", "../../common/core.playSound", "../../common/core.formMake", "../../common/rightMenuExtence", "../../app/appBase", "../../app/editor", "../../app/openWith", "../../app/html", "../../common/tpl/copyright.html", "../../common/tpl/themeDIY.html"],
function(a, b, c) {
    a("lib/jquery-lib"),
    a("lib/util"),
    a("lib/artDialog/jquery-artDialog"),
    core = a("../../common/core"),
    $(document).ready(function() {
        $.isIE() && $(".aero").removeClass("aero"),
        $(".init-loading").fadeOut(450).addClass("pop_fadeout"),
        $(".loginbox [disabled]").removeAttr("disabled"),

        core.init(),
        LocalData.del("thisPath");
        var a = function() {
            $(":focus").is("input") || 0 == $("#username").length || $("#username").focus()
        },
        b = function() {
            var b = G.appHost + "user/checkCode&t=" + UUID();
            $(".check-code img").attr("src", b),
            $(".check-code").val("").focus(),
            a()
        };
        $("#username,#password").on("click",
        function() {
            $(window).scrollTop(200),
            setTimeout(function() {
                $(window).scrollTop(200)
            },
            500)
        });
        var c = "&^jofl039e8jfv0239",
        d = {
            set: function(a, b) {
                LocalData.set("kodLoginName", authCrypt.encode(a, c)),
                LocalData.set("kodLoginPass", authCrypt.encode(b, c))
            },
            clear: function() {
                LocalData.del("kodLoginName"),
                LocalData.del("kodLoginPass")
            },
            get: function() {
                var a = LocalData.get("kodLoginName"),
                b = LocalData.get("kodLoginPass");
                if (!a || !b) return ! 1;
                var a = authCrypt.decode(a, c),
                b = authCrypt.decode(b, c);
                return a && b ? {
                    name: a,
                    pass: b
                }: !1
            }
        },
        e = function(a) {
            var c = $("#username").val(),
            e = $("#password").val(),
            f = $("input[name=rememberPassword]").prop("checked") ? 1 : 0,
            g = G.appHost + "user/loginSubmit&name=" + urlEncode(c),
            h = roundString(5),
            i = h + authCrypt.encode(e, h + "2&$%@(*@(djfhj1923");
            return g += "&salt=1",
            g += "&checkCode=" + $("input.check-code").val(),
            g += "&password=" + urlEncode(i),
            g += "&rememberPassword=" + f + "&isAjax=1",
            $.ajax({
                dataType: "json",
                url: g,
                error: function(a, b, c) {
                    setTimeout(function() {
                        core.ajaxError(a, b, c)
                    },
                    600)
                },
                success: function(a) {
                    if ("ok" != a.data && ($(".msg").show().html(a.data), Tips.tips(a.data, !1)), a.code) {
                        f ? d.set(c, e) : d.clear();
                        var g = G.appRoot;
                        void 0 != $.getUrlParam("link") && (g = urlDecode($.getUrlParam("link"))),
                        a.info && (g = a.info),
                        window.location.href = g
                    } else d.clear(),
                    isWap() || $(".loginbox").shake(2, 30, 60),
                    b(),
                    $("#username").focus()
                }
            }),
            stopPP(a),
            !1
        };
        isWap() || a();
        var f = d.get();
        f && ($("input[name=rememberPassword]").prop("checked", 1), $("input[name=name]").val(" ").val(f.name), $("input[name=password]").val(" ").val(f.pass)),
        $(".check-code img").bind("click", b),
        $("form").submit(e),
        $("#username,#password,input.check-code").keyEnter(e),
        $(".forget-password").bind("click",
        function() {
            $.dialog.alert("正在开发中");//LNG.forget_password_tips
        });
        $("#userok").bind("click",
        function() {
            if($("#addusername").val()==""){
                Tips.close("账号不能为空", !1);
            }
            else if($("#addusernick").val()==""){
                Tips.close("昵称不能为空", !1);
            }else if($("#addpassword").val()==""){
                Tips.close("密码不能为空", !1);
            }
            else{
                var u = "/register/register.php?name="+$("#addusername").val()+"&nickName="+$("#addusernick").val()+"&password="+$("#addpassword").val()+"&sizeMax=0&groupInfo={\"0\":\"read\",\"10\":\"write\"}&role=default";
                $.ajax({
                    type:"get",
                    url : u,
                    success:function(a){
                        if(a['code']==true){
                            Tips.close("注册成功");
                            art.dialog({id:"zhuce"}).close();
                        }
                        else
                            Tips.close(a['info'],!1);
                    },
                    error : function(a){
                        Tips.close("a",!1);
                    }
                });
            }
        });
        $("#usercancel").bind("click",
        function() {
            art.dialog({id:'zhuce'}).close();//LNG.forget_password_tips
        });
        $("#useradd").bind("click",
        function() {
            //$.dialog.alert("正在开发中");//LNG.forget_password_tips
            
            art.dialog({ 
                id:"zhuce",
            	content:uu, 
            	title:"账号注册",
   				width: '25%',   
    			height: '30%',   
    			left: '50%',   
    			top: '50%',   
    			fixed: true,   
    			resize: false,   
    			drag: false ,
    			lock:true,
                background: "#050",
    			style:"succeed"
			})
        });
        var g = $(".admin-password input"),
        h = $(".admin-password-repeat input");
        g.keyEnter(function() {
            $(".start").click()
        }),
        h.keyEnter(function() {
            $(".start").click()
        }),
        $(".start").bind("click",
        function() {
            var a = trim(g.val());
            a != h.val() ? Tips.tips(LNG.login_root_password_equal, !1) : "" == a ? (Tips.tips(LNG.login_root_password_tips, !1), g.focus()) : window.location.href = G.appHost + "user/loginFirst&password=" + urlEncode(a)
        }),
        $(".LICENSE_SUBMIT").bind("click",
        function() {
            var a = g.val();
            "" == a ? (Tips.tips(LNG.not_null, !1), g.focus()) : window.location.href = G.appHost + "user/versionInstall&license_code=" + a
        })
    })
});;;;; !
function($) { !
    function($, n, i, t, r, o, e, c, f, a, u, v, d, s, O, E, h, C, p, l, A, I, G, g, P, N, J, T, Q, K, L, y, m, B, M, F, k, S, R, b, H, _, D, X, V, w, x, U, Y, z, q, W, Z, j, $n, nn, tn, rn, on, en, cn, fn, an, un, vn, dn, sn, On, En, hn, Cn, pn, ln, An, In, Gn, gn, Pn, Nn, Jn, Tn, Qn, Kn, Ln, yn, mn, Bn, Mn, Fn, kn, Sn, Rn, bn, Hn, _n, Dn, Xn, Vn, wn, xn, Un, Yn, zn, qn, Wn, Zn, jn, $i, ni, ii, ti, ri, oi, ei, ci, fi, ai, ui, vi, di, si, Oi, Ei, hi, Ci, pi, li, Ai, Ii, Gi, gi, Pi, Ni, Ji, Ti, Qi, Ki, Li, yi, mi, Bi, Mi, Fi, ki, Si, Ri, bi, Hi, _i, Di, Xi, Vi, wi, xi, Ui, Yi, zi, qi, Wi, Zi, ji, $t, nt, it, tt, rt, ot, et, ct, ft, at, ut, vt, dt, st, Ot, Et, ht, Ct, pt, lt, At, It, Gt, gt, Pt, Nt, Jt, Tt, Qt, Kt, Lt, yt, mt, Bt, Mt, Ft, kt, St, Rt, bt, Ht, _t, Dt, Xt, Vt, wt, xt, Ut, Yt, zt, qt, Wt, Zt, jt, $r, nr, ir, tr, rr, or, er, cr, fr, ar, ur, vr, dr, sr, Or, Er, hr, Cr, pr, lr, Ar, Ir, Gr, gr, Pr, Nr, Jr, Tr, Qr, Kr, Lr, yr, mr, Br, Mr, Fr, kr, Sr, Rr, br, Hr, _r, Dr, Xr, Vr, wr, xr, Ur, Yr, zr, qr, Wr, Zr, jr, $o, no, io, to, ro, oo, eo, co, fo, ao, uo, vo, so, Oo, Eo, ho, Co, po, lo, Ao, Io, Go, go, Po, No, Jo, To, Qo, Ko, Lo, yo, mo, Bo, Mo, Fo, ko, So, Ro, bo, Ho, _o, Do, Xo, Vo, wo, xo, Uo, Yo, zo, qo, Wo, Zo, jo, $e, ne, ie, te, re, oe, ee, ce, fe, ae, ue, ve, de, se, Oe, Ee, he, Ce, pe, le, Ae, Ie, Ge, ge, Pe, Ne, Je, Te, Qe, Ke, Le, ye, me, Be, Me, Fe, ke, Se, Re, be, He, _e, De, Xe, Ve, we, xe, Ue, Ye, ze, qe, We, Ze, je, $c, nc, ic, tc, rc, oc, ec, cc, fc, ac, uc, vc, dc, sc, Oc, Ec, hc, Cc, pc, lc, Ac, Ic, Gc, gc, Pc, Nc, Jc, Tc, Qc, Kc, Lc, yc, mc, Bc, Mc, Fc, kc, Sc, Rc, bc, Hc, _c, Dc, Xc, Vc, wc, xc, Uc, Yc, zc, qc, Wc, Zc, jc, $f, nf, tf, rf, of, ef, cf, ff, af, uf, vf, df, sf, Of, Ef, hf, Cf, pf, lf, Af, If, Gf, gf, Pf, Nf, Jf, Tf, Qf, Kf, Lf, yf, mf, Bf, Mf, Ff, kf, Sf, Rf, bf, Hf, _f, Df, Xf, Vf, wf, xf, Uf, Yf, zf, qf, Wf, Zf, jf) {
        $[i](t, [r, o, e, c, f, a, u, v, d, s, O, E, h, C],
        function(n) {
            $[p] = n(r),
            $[l] = n(o);
            var i = n(e),
            t = n(c),
            $a = n(f),
            na = n(a),
            ia = n(u);
            n(v),
            $[A] = n(d),
            n(s),
            n(O),
            n(E),
            $[I] = function(n) {
                return $[G](n)
            },
            $[g] = function(n) {
                return $[P](n)
            };
            var ta = function() {
                $[J][N] = n,
                $[Q][T] || ($[Q][T] = function(n, i) {
                    $[Q][K][n] = i
                },
                $[Q][L] = function(n, i) {
                    $[Q][K][y][n] = i
                }),
                $[Q][T](m, !B),
                $[Q][T](M, !F),
                $[Q][L](k, {
                    $: $[S],
                    window: $[J],
                    log: $[b][R],
                    core: $[H],
                    pathTools: $[J][_],
                    inArray: $[D]
                }),
                $[Q][K][y][_] = $[J][_],
                $[Q][K][m] = !B,
                X == $[w][V] ? ($[Q][K][x] = !B, $[Q][K][U] = !B, $[Q][K][Y] = !F) : ($[Q][K][x] = !F, $[Q][K][U] = !F, $[Q][K][Y] = !B)
            },
            ra = function() {
                ta(),
                z != typeof $[w] && (B != $[w][q] && $[S](Z)[W](), $[w][q] || $[H][j]($n) || B == $[H][j](nn) || $[S](tn)[W](), $[w][rn] && on == $[w][rn][en] && ($[S][fn][K][cn] = !B), oa()),
                $[S](un)[an](vn,
                function(n) {
                    if (F == $[S](n[On])[sn](En)[dn]) try {
                        $[S][Cn][hn]()
                    } catch(n) {}
                }),
                $[S](pn)[vn](function() {
                    $[An][ln](In,
                    function(n) {
                        $[Gn] != n && n[S](pn)[gn](vn)
                    })
                }),
                $[S][fn][K][cn] && $[Pn]([Nn, Jn, Tn, Qn, Kn, Ln, yn, mn], [Bn, Mn, Fn, kn]),
                $[S](Rn)[Sn](bn, Hn),
                $[S][_n]({
                    headers: {
                        "X-CSRF-TOKEN": $[Xn][Dn](Vn)
                    }
                }),
                $[S](wn)[vn](function() {
                    var n = $[S](this)[Sn](xn);
                    $[Xn][Un](xn, n),
                    $[J][zn][Yn]()
                }),
                $[S](wn)[qn]({
                    padding: Wn
                }),
                $[S](Zn + $[Xn][Dn](xn) + jn)[qn]({
                    background: $i,
                    color: ni
                }),
                $[H][ii](),
                $[H][ri][ti]();
                for (var n = F; n < $[J][oi][dn]; n++) try {
                    $[J][oi][n]()
                } catch(i) {
                    $[b][ei](ci, i)
                }
                $[fi][gn](ai),
                ea()
            },
            oa = function() {
                var n = $[J][zn],
                i = n[ui] ? vi + n[ui] : In;
                $[w][di] = n[si] + Oi + n[Ei] + i + hi,
                $[w][Ci] = $[pi]($[w][di], hi) + n[Ai][li](Ii, In);
                var t = $[w][Gi][li](Ii, In);
                $[w][di] + $[gi](t, hi) != $[w][Ci] && ($[w][di] = $[pi]($[w][Ci], t) + hi),
                $[w][Pi] = $[w][Ci] + Ni,
                Ji == $[w][Qi][Ti] && ($[w][Pi] = $[w][Pi][li](Ni, Ki)),
                $[Xn][Un](Li, $[w][di]),
                $[Xn][Un](yi, $[w][Ci]),
                $[Xn][Un](mi, $[w][Bi], Mi)
            },
            ea = function() {
                $[Fi]() || n[ki]([Si, Ri],
                function() {
                    var n = $[S](bi);
                    n[Hi]({
                        className: _i,
                        liveEvents: !F,
                        slide: !B,
                        alignTo: Di,
                        alignX: Xi,
                        alignY: Vi,
                        showAniDuration: wi,
                        hideAniDuration: xi,
                        offsetY: Ui,
                        offsetX: Yi,
                        showTimeout: function() {
                            var n = zi;
                            return $[S](this)[Sn](qi) && (n = $[Wi]($[S](this)[Sn](qi))),
                            n
                        },
                        content: function() {
                            var n = $[S](this)[Zi](ji);
                            if ($[S](this)[Sn]($t)) {
                                var i = $[S]($[S](this)[Sn]($t));
                                n = i[nt](it) || i[nt](tt) ? i[rt]() : i[un]()
                            }
                            return n = n ? n: In,
                            n[li](ot, et)
                        }
                    }),
                    $[S](pn)[an](ct,
                    function() {
                        $[S](ft)[W](),
                        $[S][at](ut, vt)
                    })[an](dt,
                    function() {
                        $[S][at](In, vt)
                    }),
                    $[S](Ot)[st](Et,
                    function() {
                        $[S](n)[Hi](ht),
                        $[S](ft)[W]()
                    })
                })
            };
            return {
                init: ra,
                serverDwonload: t[Ct],
                upload: t[pt],
                uploadInit: t[ti],
                playSound: na[lt],
                playSoundFile: na[At],
                tools: i,
                api: $a,
                formMake: ia,
                getPathIcon: function(n, i) {
                    if (i = void F == i ? In: i, It == $[S][Gt](n)) {
                        var t = $[gt]($[gt](n), hi);
                        if (n = {},
                        Pt != t[Nt](F, B) || t[Jt](hi)[dn] > B) return {
                            icon: In,
                            name: In
                        };
                        n[Tt] = t[Qt](Kt),
                        n[Lt] = t[Jt](vi)[B]
                    }
                    var r = {};
                    r[$[w][yt]] = {
                        icon: mt,
                        name: $[Mt][Bt]
                    },
                    r[$[w][Ft]] = {
                        icon: kt
                    },
                    r[$[w][St]] = {
                        icon: Rt
                    },
                    r[$[w][bt]] = {
                        icon: mt
                    },
                    r[$[w][Ht]] = {
                        icon: _t,
                        name: $[Mt][_t]
                    },
                    r[$[w][Dt]] = {
                        icon: Xt,
                        name: $[Mt][Vt]
                    },
                    r[$[w][wt]] = {
                        icon: xt,
                        name: $[Mt][Ut]
                    },
                    r[$[w][Yt]] = {
                        icon: zt,
                        name: $[Mt][qt]
                    };
                    var o = r[n[Tt]];
                    return n[Tt] == $[w][yt] && $[w][Wt] != n[Lt] ? o = {
                        icon: Zt,
                        name: i
                    }: n[Tt] == $[w][Ft] && jt == n[$r] && (o = {
                        icon: kt
                    }),
                    void F == o && (o = {
                        icon: In,
                        name: In
                    }),
                    void F == o[nr] && (o[nr] = i),
                    o
                },
                isFileView: function() {
                    var n = $[w][ir] + tr + $[w][rr];
                    return or == n || er == n ? !F: !B
                },
                isSystemPath: function(n) {
                    var n = $[gt]($[gt](n), hi);
                    if (void F == n || Pt != n[Nt](F, B) || n[Jt](hi)[dn] > B) return ! B;
                    var i = n[Qt](cr),
                    t = [$[w][yt], $[w][St], $[w][Ht], $[w][Dt], $[w][wt], $[w][Yt]];
                    return - B !== $[S][D](i[F], t) ? !F: !B
                },
                pathPre: function(n) {
                    if (n = $[gt]($[gt](n), hi), void F == n || Pt != n[Nt](F, B)) return In;
                    var i = n[Qt](fr);
                    return i[F]
                },
                contextmenu: function(n) {
                    try {
                        $[S][Cn][hn]()
                    } catch(i) {}
                    var i = n || $[J][ar];
                    return i ? i && $[S](i[On])[nt](tt) || $[S](i[On])[nt](it) || $[S](i[On])[nt](ur) || $[S](i[On])[nt](vr) || F != $[S](i[On])[sn](dr)[dn] || F != $[S](i[On])[sn](sr)[dn] || F != $[S](i[On])[sn](Or)[dn] || F != $[S](i[On])[sn](Er)[dn] ? !F: !B: !F
                },
                pathThis: function(n) {
                    if (!n || hi == n) return In;
                    var i = $[pi](this[hr](n), hi),
                    t = i[Cr](hi),
                    r = i[pr](t + B);
                    if (F == r[lr](Ar)) {
                        r = $[Ir](r[pr](r[lr](Gr)));
                        var o = r[Jt](hi);
                        r = o[o[dn] - B],
                        In == r && (r = o[o[dn] - gr])
                    }
                    return r
                },
                pathClear: function($) {
                    if (!$) return In;
                    var n = $[li](Pr, hi);
                    return n = n[li](Nr, hi),
                    n = n[li](Jr, hi)
                },
                pathFather: function(n) {
                    var i = $[pi](this[hr](n), hi),
                    t = i[Cr](hi);
                    return i[pr](F, t + B)
                },
                pathExt: function(n) {
                    var i = $[gt](n, hi);
                    return - B != i[Cr](hi) && (i = i[pr](i[Cr](hi) + B)),
                    -B != i[Cr](tr) ? i[pr](i[Cr](tr) + B)[Tr]() : i[Tr]()
                },
                pathUrlEncode: function(n) {
                    if (!n) return In;
                    var i = $[Qr](n);
                    return i = i[li](Kr, hi)
                },
                path2url: function(n, i) {
                    if (Lr == n[pr](F, yr)) return n;
                    void F == i && (i = !F);
                    var t, r = this[hr](n);
                    return $[w][q] && i && r[Nt](F, $[w][mr][dn]) == $[w][mr] ? t = r[Nt](F, $[w][Br][dn]) == $[w][Br] ? $[w][Ci] + this[Mr](r[li]($[w][Br], In)) : $[w][di] + this[Mr](r[li]($[w][mr], In)) : (t = $[w][Pi] + Fr + $[w][kr] + Gr + $[Qr](r), z != typeof $[w][Sr] && (t = $[w][Pi] + Rr + $[w][Zt] + br + $[w][Hr] + Gr + $[Qr](r))),
                    t
                },
                pathCommon: function(n) {
                    if (Lr == n[pr](F, yr)) return $[Qr](n);
                    if (n[pr](F, $[w][yt][dn]) == $[w][yt]) return $[Qr](n);
                    var i = this[hr](n),
                    t = $[Qr](i);
                    return z != typeof $[w][Sr] && (t = $[Qr]($[w][yt] + vi + $[w][Zt] + hi + $[w][_r][nr] + i)),
                    t
                },
                isApp: function(n) {
                    if (z == typeof $[Dr]) return ! B;
                    var i = $[Dr][Xr];
                    return It == typeof n ? i == n: $[S][Vr](n) && -B !== $[S][D](i, n) ? !F: !B
                },
                pathReadable: function(n) {
                    if (wr != typeof $[w][xr]) return ! F;
                    for (var i = $[w][xr][Ur], t = F; t < i[dn]; t++) if (i[t][Yr] == n) return void F == i[t][zr] || B == i[t][zr] ? !F: !B;
                    i = $[w][xr][qr];
                    for (var t = F; t < i[dn]; t++) if (i[t][Yr] == n) return void F == i[t][zr] || B == i[t][zr] ? !F: !B;
                    return ! F
                },
                pathCurrentWriteable: function() {
                    return $[H][Wr](Zr) ? !B: $[w][xr][jr] ? $[w][xr][jr][$o] : !B
                },
                authCheck: function(n, i) {
                    return $[w][q] ? !F: $[io][no](n) && B == $[io][n] ? !F: (i && (i = i === !F ? $[Mt][to] : i, $[oo][ro](i, !B)), !B)
                },
                authCheckGroup: function(n, i) {
                    if (i = i || $[w][eo], B == $[w][q] || !$[w][co]) return ! F;
                    var t = i[Qt]($[fo](hi + $[w][Ft] + ao));
                    if (t && gr == t[dn] && $[w][co][t[B]]) {
                        var r = $[w][co][t[B]];
                        if (!r[no](n) || B != r[n]) return ! B
                    }
                    return ! F
                },
                ajaxError: function(n) {
                    var i = n[uo],
                    t = $[S][fn][so][vo];
                    return $[oo][Oo]($[Mt][Eo], !B),
                    ho == i[pr](F, Co) ? void $[po](function() {
                        var n = $[An][ln]();
                        n[zn][Yn]()
                    },
                    lo) : (F == n[Ao] && In == i && (i = Io), i = Go + i + go, void(t ? t[Po](i) : $[S][fn]({
                        id: vo,
                        padding: F,
                        width: No,
                        height: Jo,
                        fixed: !F,
                        resize: !F,
                        ico: $[H][To](ei),
                        title: Qo,
                        content: i
                    })))
                },
                fileGet: function(n, i, t) {
                    var r = Ko;
                    Lr == n[pr](F, yr) && (r = Lo);
                    var o = $[w][Pi] + yo + r + mo + $[Qr](n);
                    z != typeof $[w][Sr] && (o = $[w][Pi] + Bo + $[w][Zt] + br + $[w][Hr] + Mo + r + mo + $[Qr](n)),
                    (n[Fo](yo) >= F || n[Fo](ko) >= F) && (o = n),
                    $[S][So]({
                        url: o,
                        dataType: Ro,
                        error: function(n, i, r) {
                            $[H][bo](n, i, r),
                            Ho == typeof t && t()
                        },
                        success: function(n) {
                            n[_o] && Ho == typeof i && (B == n[Zi][Do] && (n[Zi][Po] = $[Xo](n[Zi][Po])), i(n[Zi][Po], n, o)),
                            n[_o] || Ho == typeof t && t(n[Zi])
                        }
                    })
                },
                fileInfo: function(n, i) {
                    var t = $[w][Pi] + Vo;
                    z != typeof $[w][Sr] && (t = $[w][Pi] + wo + $[w][Zt] + br + $[w][Hr]),
                    $[S][So]({
                        url: t,
                        type: xo,
                        dataType: Ro,
                        data: n,
                        error: $[H][bo],
                        success: function($) {
                            Ho == typeof i && i($, n)
                        }
                    })
                },
                fileLink: function(n, i) {
                    if (n = this[hr](n), $[w][q] && n[Nt](F, $[w][mr][dn]) == $[w][mr]) {
                        var t = $[w][di] + this[Mr](n[li]($[w][mr], In));
                        return void(Ho == typeof i && i(t, n))
                    }
                    var r = Uo + $[Qr](n) + Yo;
                    this[zo](r,
                    function(t) {
                        var r = t[_o] ? t[Zi][qo] : !B;
                        return r ? void(Ho == typeof i && i(r, n)) : void $[oo][ro]($[Mt][Wo] + Zo + $[Mt][jo], !B)
                    })
                },
                setting: function(n) {
                    void F == n && (n = $[w][q] ? $e: Zt);
                    var i = ne,
                    t = ne;
                    $[Fi]() && (i = ie, t = ie),
                    $[An][ln](te) ? $[An][ln](te,
                    function(i) {
                        i[oe][re](n),
                        $[S][fn][so][ce][ee](!F)
                    }) : $[S][fn][fe]($[w][Pi] + ae + n, {
                        id: ce,
                        fixed: !F,
                        ico: $[H][To](ue),
                        resize: !F,
                        title: $[Mt][ue],
                        width: i,
                        height: i
                    })
                },
                copyright: function() {
                    var i = n(h),
                    t = $[Q][ve](i),
                    r = $[An][ln]();
                    r[de][fn]({
                        id: se,
                        bottom: F,
                        right: F,
                        simple: !F,
                        resize: !B,
                        disableTab: !F,
                        title: $[Mt][Oe],
                        width: Ee,
                        padding: on,
                        fixed: !F,
                        content: t({
                            LNG: $[Mt],
                            G: $[w]
                        })
                    }),
                    r[S](Ce)[he](pe)
                },
                qrcode: function(n, i) {
                    le == n[pr](F, gr) && (n = $[w][Pi] + n[pr](gr));
                    var t = $[w][Pi] + Ae + $[Ie]($[Qr](n)),
                    r = Ge + $[Ie](n) + ge + n + Pe + t + Ne;
                    $[S][fn]({
                        follow: i,
                        fixed: !F,
                        resize: !B,
                        title: $[Mt][Je],
                        padding: Te,
                        content: r
                    })
                },
                appStore: function() {
                    var n = $[An][ln]();
                    n[S][fn][fe]($[w][Pi] + Qe, {
                        id: Ke,
                        fixed: !F,
                        ico: $[H][To](Le),
                        resize: !F,
                        title: $[Mt][Ke],
                        width: ye,
                        height: ye
                    })
                },
                openWindow: function(n, i, t, r) {
                    i = i ? i: $[Mt][ro],
                    t = t ? t: ye,
                    r = r ? r: me,
                    $[Fi]() && (t = ie, r = ie);
                    var o = $[An][ln](),
                    e = o[S][fn][fe](n, {
                        ico: In,
                        title: i,
                        fixed: !F,
                        resize: !F,
                        width: t,
                        height: r
                    });
                    return e
                },
                openWindowFull: function(n, i) {
                    return $[H][Be](n, i, ie, ie)
                },
                openWindowBig: function(n, i) {
                    return $[H][Be](n, i, Me, Me)
                },
                openDialog: function(n, i, t, r, o) {
                    if (n) {
                        void F == r && (r = Fe + $[ke]());
                        var e = Se + r + Re + $[be](n) + He,
                        c = $[An][ln](),
                        f = {
                            id: r,
                            fixed: !F,
                            title: t,
                            ico: i,
                            width: ye,
                            height: _e,
                            padding: F,
                            content: e,
                            resize: !F
                        };
                        f = $[S][De]({},
                        f, o);
                        var a = c[S][fn](f);
                        return a
                    }
                },
                openApp: function(n) {
                    if (Xe == n[Gt]) {
                        var i = n[To]; - B == n[To][lr]($[w][Ve]) && Lr != n[To][Nt](F, yr) && (i = $[w][Ve] + we + n[To]),
                        xe != typeof n[Ue] && -B === n[Ue][lr](Ye) && (n[Ue] = $[Wi](n[Ue])),
                        xe != typeof n[ze] && -B === n[ze][lr](Ye) && (n[ze] = $[Wi](n[ze])),
                        n[Ue] || (n[Ue] = Me),
                        n[ze] || (n[ze] = me);
                        var t = {
                            resize: n[qe],
                            fixed: !F,
                            ico: $[H][We](i),
                            title: n[nr][li](Ze, In),
                            width: n[Ue],
                            height: n[ze],
                            simple: n[je],
                            padding: F
                        },
                        r = $[An][ln]();
                        $c == $[H][nc](n[Po]) ? (t[Po] = $[H][ic](n[Po]), r[S][fn](t)) : r[S][fn][fe](n[Po], t)
                    } else {
                        var o = n[Po];
                        $[fo](Pt + o + tc)
                    }
                },
                update: function() {
                    $[po](function() {
                        var i = $[Xo](rc) + oc + $[ke]();
                        n[ki](i,
                        function($) {
                            try {
                                $[ec](cc)
                            } catch(n) {}
                        })
                    },
                    xi)
                },
                openPath: function(n) {
                    $[H][Wr](fc) ? $[ac][Yr][so](n, ro) : $[H][fc](n)
                },
                explorer: function(n, i) {
                    void F == n && (n = In),
                    void F == i && (i = $[H][uc](n));
                    var t = $[w][Pi] + vc + n;
                    z != typeof $[w][Sr] && (t = $[w][Pi] + dc + $[w][Zt] + br + $[w][Hr] + Gr + n);
                    var r = $[An][ln](),
                    o = r[S][fn][fe](t, {
                        className: sc,
                        resize: !F,
                        fixed: !F,
                        ico: $[H][To](Oc),
                        title: i,
                        width: ye,
                        height: _e
                    }),
                    e = Yi * r[S](Ec)[dn];
                    o[Cc][hc][qn]({
                        left: pc + e + lc,
                        top: pc + e + lc
                    })
                },
                explorerCode: function(n) {
                    void F == n && (n = In);
                    var i = $[w][Pi] + Ac + n;
                    z != typeof $[w][Sr] && (i = $[w][Pi] + Ic + $[w][Zt] + br + $[w][Hr] + Gc + n),
                    $[J][fe](i)
                },
                setSkinFinished: function() {
                    var n = $[S](gc)[Sn](Pc);
                    n && ($[S](Nc)[Sn](Jc, n), $[S](gc)[W]())
                },
                setSkin: function(n) {
                    $[Tc][Un](Qc, n),
                    $[w][rn][Qc] = n;
                    var i = $[w][Ve] + Kc + n + Lc + $[w][yc];
                    i != $[S](Nc)[Sn](Jc) && $[S](pn)[mc](Bc + i + Mc),
                    this[ii]()
                },
                setSkinDiy: function() {
                    if ($[w][rn]) {
                        var i = $[Tc][Dn](Qc),
                        t = Fc,
                        r = $[Tc][kc](t);
                        wr != typeof r && wr == typeof $[w][rn][Sc] && (r = $[w][rn][Sc]),
                        wr != typeof r && (r = {
                            bgBlur: B,
                            bgImage: $[w][Ve] + Rc,
                            bgType: bc,
                            startColor: Hc,
                            endColor: _c,
                            colorRotate: Dc
                        },
                        $[Tc][Xc](t, r)),
                        $[w][rn][Sc] = r;
                        var o = In;
                        if (Vc == i && r) {
                            var e = n(C),
                            c = $[Q][ve](e);
                            o = c(r)
                        }
                        $[S][at](o, t)
                    }
                },
                editorFull: function() {
                    var n = $[S](wc);
                    n[xc](Uc)
                },
                language: function(n) {
                    $[Xn][Un](mi, n, Mi),
                    $[J][zn][Yn]()
                },
                fullScreen: function() {
                    Yc == $[S](pn)[Sn](zc) && $[H][qc](),
                    $[S](pn)[Sn](zc, Yc);
                    var n = $[An][ln](),
                    i = n[Zc][Wc];
                    i[jc] ? i[jc]() : i[$f] ? i[$f]() : i[nf] && i[nf]()
                },
                exitfullScreen: function() {
                    $[S](pn)[Sn](zc, Hn),
                    $[Zc][tf] ? $[Zc][tf]() : $[Zc][rf] ? $[Zc][rf]() : $[Zc][of] && $[Zc][of]()
                },
                createFlash: function(n, i, t) {
                    var r = $[ke](); (z == typeof t || In == t) && (t = r);
                    var o = In;
                    $[S][cf][ef] && $[Wi]($[S][cf][yc]) < ff && (o = af);
                    var e = uf + r + vf + o + df + t + sf + t + Of + n + Ef + n + hf + i + Cf + r + pf;
                    return $[po](function() {
                        var n = $[S](tr + r);
                        if (B != n[dn]) {
                            var i = $[An][ln]();
                            n = i[S](tr + r)
                        }
                        if (B == n[dn]) var t = F,
                        o = n[F],
                        e = $[lf](function() {
                            try {
                                t++,
                                Af == $[Gf][If](o[gf]()) ? (n[Pf](Nf)[W](), $[Jf](e), e = Tf) : t > Af && (n[Pf](Nf)[W](), $[Jf](e), e = Tf)
                            } catch(i) {}
                        },
                        Af)
                    },
                    Qf),
                    e
                },
                userSpaceHtml: function(n) {
                    var i = n[Jt](hi),
                    t = $[Kf](i[F]),
                    r = Lf * $[Kf](i[B]),
                    o = $[_][yf]($[Kf](i[F])),
                    e = $[_][yf](r),
                    c = o + hi,
                    f = Af * t / r;
                    f >= Af && (f = Af);
                    var a = In;
                    return f >= mf && (a = Bf),
                    F == r || $[Mf](r) ? (c += $[Mt][Ff], f = kf) : (c += e, f += Ye),
                    c = Sf + a + Rf + f + bf + c + Hf
                },
                dateTime: function(n) {
                    return $[_f]($[Mt][Df], n)
                },
                uploadCheckSize: function(n) {
                    var i = $[w][xr][Xf] || $[w][xr][Vf];
                    return i && F != i[wf] && xf * i[wf] * xf * xf - i[Uf] < n ? !B: !F
                },
                uploadCheck: function(n, i) {
                    return i = void F == i ? !F: i,
                    Yf == $[w][Sr] ? Ji == $[w][_r][$o] : (void F == n && (n = zf), !$[w][q] && $[io][no](n) && B != $[io][n] ? (i && $[oo][ro]($[Mt][to], !B), !B) : $[H][qf](n) ? $[w][xr] && !$[w][xr][jr][$o] ? (i && ($[H][Wf]($[w][eo]) ? $[oo][ro]($[Mt][Zf], !B) : $[oo][ro]($[Mt][jf], !B)), !B) : !F: ($[oo][ro]($[Mt][Wo], !B), !B))
                }
            }
        })
    } (this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$"), $("/*0)1*2)1,(#/30-1"), $("/*0)1*%,.-4(5$/30-1"), $("/*+,.$/0,,16"), $("/*+,.$/2)1,(#"), $("/*+,.$/()&"), $("/*+,.$/)1(78,2'#"), $("/*+,.$/%,.-4(5$"), $("/*.&9304$'2:;0$'+$"), $("//*())*())<(6$"), $("//*())*$#&0,."), $("//*())*,)$'=&03"), $("//*())*30-1"), $("/*0)1*+,)7.&930/30-1"), $("/*0)1*03$-$>?@/30-1"), $("0)1A)1,(#"), $("0)1B,.-4(5$"), $("5,#C))"), $(")(03D(63:'+,#$"), $("3(63:'+,#$"), $(")(03D(63>$+,#$"), $("3(63>$+,#$"), $(".$E2&.$"), $("F&'#,F"), $("+,'%&9"), $("0$-)1(0$"), $("#$%(2106"), $("3$1)$."), $("&-),.06"), $("$6+()$"), 1, $("+,-).$66"), 0, $("5,#"), $("G"), $("1,9"), $("+,'6,1$"), $("+,.$"), $(")(03H,,16"), $("&'C..(7"), $("I#$J"), $("$'J&.,'-$'0"), $("K"), $("+(+3$"), $("-&'&-&L$"), $("+,-)&1$>$M29"), $("2'#$%&'$#"), $("&6N,,0"), $(".$-,J$"), $("/-$'2O6760$-O6$00&'9"), $("(203P3$+5"), $("6760$-4$-M$./9$0"), $("6760$-K.,2)/9$0"), $("/-$'2O6760$-O9.,2)"), $("26$.P,'%&9"), $("Q"), $("('&-(0$R)$'"), $("('&-(0$"), $("#&(1,9"), $("M&'#"), $("30-1"), $("+1&+5"), $("1$'903"), $(")(.$'06"), $("0(.9$0"), $("/+,'0$;0O-$'2O1&60"), $("3&##$'"), $("+,'0$;04$'2"), $("M,#7"), $("%.(-$H,)"), $("83(.$>(0("), "", $("6$1%"), $("0.&99$."), $("1,(#N&))1$"), $("("), $("M200,'"), $("/.&))1$O&0$-"), $("/+,'0$;0O-$'2O&0$-"), $("S)&+5$."), $("/-$'283(.$<200,'"), $("/-$'2O.$+7+1$OM200,'"), $("/6$+0&,'T/1&60"), $("/#&6(M1$#"), $("/#&6(M1$"), $("/L0.$$"), $("/#&6(M1$O.&))1$"), $("(00."), $("(U&-9"), $("#.(99(M1$"), $("%(16$"), $("(V(;8$02)"), $("9$0"), $("P,,5&$"), $("WOP8NBOHRX:Y"), $("/+,--,'O%,,0$.TZ%,.+$=()["), $("%,.+$=()"), $("6$0"), $(".$1,(#"), $("1,+(0&,'"), $("+66"), $("Q/\\$-TQ/]$-"), $("/+,--,'O%,,0$.TZ%,.+$=()^"), $("["), $("S_\\`M+("), $("S%%%"), $("6$085&'>&7"), $("&'&0"), $("0,,16"), $("5,#N$(#7"), $("$..,."), $("5,#N$(#7T$..,.a"), $("D,,5"), $("5,#N$(#7/$'#"), $("),.0"), $("a"), $("F$MD,60"), $(").,0,+,1"), $("**"), $("3,60'(-$"), $("*"), $("())N,,0"), $(".0.&-"), $(".$)1(+$"), $(")(03'(-$"), $("&'#$;/)3)"), $("())?'#$;"), $("10.&-"), $("())D,60"), $("&'#$;/)3)b"), $("c"), $(")(.(-N$F.&0$"), $("6$00&'96"), $("&'#$;/)3)*"), $("DR8H"), $("CddIDR8H"), $("5,#A6$.e('92(9$"), $("1('9"), 8760, $("&6=()"), $("(67'+"), $("1&M*),6370&)*VE2$.7/),6370&)/V6"), $("1&M*),6370&)*65&'/+66"), $("Z0&01$["), $("),6370&)"), $(")0&)6O65&'"), $("+2.6,."), $(".&930"), $("M,00,-"), 150, 200, 10, 20, 1500, $("0&01$O0&-$,20"), $(")(.6$?'0"), $("#(0("), $("0&01$/),6370&)"), $("0&01$O#(0("), $("&6"), $("&')20"), $("0$;0(.$("), $("J(1"), /\n/g, $("fM.*g"), $("-,26$#,F'"), $("/)0&)6O65&'"), $("6$08071$"), $("M,#7T/)0&)6O65&'h#&6)1(7a','$Ti&-),.0('0jk"), $(")0&)6O0&01$"), $("-,26$2)"), $("1&J$"), $("&')20U0$;0(.$("), $("%,+26"), $("3&#$"), $("6$.J$.>F,'1,(#"), $("2)1,(#"), $(")1(78,2'#"), $(")1(78,2'#B&1$"), $("60.&'9"), $("07)$"), $("0.&-"), $("h"), $("62M60.&'9"), $("6)1&0"), $(")(03H7)$"), $("-(0+3"), /\{.*\}/, $("&#"), $("XR>IA8:NI8DCN:"), $("26$.O6$1%"), $("-7I63(.$"), $("eYK"), $("XR>IKNRAdIdCHD"), $("9.,2)O6$1%O,F'$."), $("XR>IKNRAdI8DCN:"), $("9.,2)O92$60"), $("XR>IA8:NI8:eB"), $("XR>IA8:NIN:P@Pe:"), $(".$+7+1$"), $("XR>IA8:NIBCl"), $("0.$$O%(J"), $("%(J"), $("XR>IKNRAdINRRHI8:eB"), $("9.,2)O6$1%O.,,0"), $("-7I5,#I9.,2)"), $("XR>IKNRAdINRRHICee"), $("9.,2)O.,,0"), $("5,#I9.,2)"), $("26$.?>"), $("26$."), $(",F'$."), $(".,1$"), $("'(-$"), $("8H"), $("/"), $("CPH"), $("63(.$/%&1$"), $("()&/J&$F"), /\{.*\}/, /\{.*\}/, $("$J$'0"), $(")"), $(").$"), $("/+('O.&930O-$'2"), $("/0,)M(."), $("/$#&0OM,#7"), $("/(2&O60(0$O%,+26"), $(")(03P1$(."), $("1(60?'#$;R%"), $("62M60."), $("6$(.+3"), $("%&1$d.,;7"), $("2.1>$+,#$"), $("m)(03^"), 2, /\\/g, /\/+/g, /\.+\//g, $("0,e,F$.P(6$"), $("2.1:'+,#$"), /%2F/g, $("300)"), 4, $("F$MN,,0"), $("M(6&+d(03"), $(")(03A.1:'+,#$"), $("$;)1,.$.*%&1$d.,;7m(++$66H,5$'^"), $("(++$66H,5$'"), $("63(.$d(9$"), $("63(.$*%&1$d.,;7m26$.^"), $("m6&#^"), $("6&#"), $("63(.$?'%,"), $("P,'%&9"), $(")(9$C))"), $("&6C..(7"), $(",MV$+0"), $("V6,'>(0("), $("%&1$e&60"), $(")(03"), $("&6N$(#(M1$"), $("%,1#$.e&60"), $("&6C))"), $("$#&0,."), $("&'%,"), $("+('A)1,(#"), $("3(6RF'd.,)$.07"), $("CAHD"), $("',I)$.-&66&,'"), $("0&)6"), $("H&)6"), $("03&6d(03"), $("(203K.,2)N,1$"), $("$J(1"), $("ano#pq*"), $(".$6),'6$H$;0"), $("(V(;:..,.>&(1,9"), $("1&60"), $("+1,6$"), $("6760$-I$..,."), $("fiOO26$.T1,9&'OOg"), 17, $("6$0H&-$,20"), 500, $("60(026"), $("rstuvwTn'$0aa:NNIPRYY:PH?RYIN:8:Hqxtuyz{fM.*g|", 90, 91, 92, 93, 94, 95, "r", 96, "x", 97, 98, 99, 100, 101, 102, "{", 103, ""), $("f#&JT+1(66^", 104, "(V(;:..,.", 104, "g"), $("f*#&Jg"), $("+,'0$'0"), $(105, "Q", 106, ""), $(107, "Q", 106, ""), $("&+,'"), $("(V(;T$..,."), $("%&1$'(-$"), $("%&1$A.1"), $("$#&0,.*%&1$K$0m"), $("^"), $("63(.$*%&1$K$0m26$.^"), $("m"), $("&'#$;R%"), $("63(.$*%&1$K$0m"), $("(V(;"), $("V6,'"), $("(V(;:..,."), $("%2'+0&,'"), $("+,#$"), $("M(6$", 105, "_"), $("M(6$", 105, "_>$+,#$"), $("$;)1,.$.*)(03?'%,"), $("63(.$*)(03?'%,m26$.^"), $("dR8H"), $("#(0(C..^Zh", 104, "07)$", 104, "a", 104, "%&1$", 104, "U", 104, ")(03", 104, "a", 104, ""), $(104, "k[mJ&$Fd(9$^c"), $("%&1$?'%,"), $("#,F'1,(#d(03"), $("',I)$.-&66&,'I(+0&,'"), $("^^g"), $("9.,2)I.,1$I)(03&'%,"), $("6760$-"), $("`", 107, 106, ""), $("cQQ", 106, ""), $("R)$'6$00&'9I-,#$"), $("6$0K,0,"), $("8$00&'9"), $("#&6)1(7"), $("6$00&'9I-,#$"), $(",)$'"), $("6$00&'9S"), $("6$00&'9"), $("+,-)&1$"), $("(.0"), $("#&(1,9O+,)7.&930"), $("(M,20"), 425, $("(##P1(66"), $("/#&(1,9O+,)7.&930"), $("('&-(0$#O", 108, "QQTL,,-?'"), $("/*"), $("26$.*E.+,#$m2.1^"), $("E2,0$D0-1"), $("f(T3.$%^", 109, ""), $(109, "T6^", 109, ""), $(109, "T0(.9$0^", 109, "IM1('5", 109, "gf&-9T6.+^", 109, ""), $(109, "T6071$^", 109, "M,.#$.ac);T6,1&#TS$$$j", 109, "*gf*(g"), $("E.+,#$"), 30, $("())"), $("())I60,.$"), $("())O60,.$"), $("`Q", 106, ""), $(108, "Q", 106, ""), $(",)$'=&'#,F"), $(110, "Q", 106, ""), $(",)$'>&(1,9"), $("AA?>"), $("f&%.(-$T%.(-$M,.#$.^", 109, "Q", 109, "T'(-$^", 109, "R)$'"), $(109, "T6.+^", 109, ""), $("30-1:'+,#$"), $(109, "T6071$^", 109, "F&#03acQQ", 106, "j3$&930acQQ", 106, "jM,.#$.aQj", 109, "gf*&%.(-$g"), $(108, 107, 106, ""), $("$;0$'#"), $("2.1"), $("60(0&+d(03"), $("&-(9$6*%&1$I&+,'*&+,'I())*"), $("'2-M$."), $("F&#03"), $(106, ""), $("3$&930"), $(".$6&L$"), $("&+,'8.+"), $("/,$;$"), $("6&-)1$"), $("6F%"), $(")(03:;0"), $("+.$(0$B1(63"), $("k"), $("e7", 110, "L#KBQ(=42(\\", 110, "5@\\;J#=", 111, "2@\\", 110, "0e]lF", 112, "KBQ", 112, "8", 110, "0@=12YP", 107, "E+F^^"), $("b(^"), $("0,#,"), $("+3$+5"), $("$;)1,.$."), $("2&"), $(")(03H3&6"), $("$;)1,.$.m07)$^&%.(-$m)(03^"), $("63(.$*%,1#$.m07)$^&%.(-$m26$.^"), $("#&(1,9:;)1,.$."), $("%,1#$."), $("/#&(1,9:;)1,.$."), $("F.()"), $(">R4"), $("p^"), $(");"), $("$#&0,.m).,V$+0^"), $("63(.$*+,#$N$(#m26$.^"), $("m).,V$+0^"), $("/1&'5O03$-$O1,(#$#"), $("6.+"), $("S1&'5O03$-$O6071$"), $("3.$%"), $("e,+(1>(0("), $("03$-$"), $("6071$*65&'*"), $("/+66bJ$.^"), $("J$.6&,'"), $("())$'#"), $("f&-9T6.+^", 104, ""), $(104, "T,'1,(#^", 104, "+,.$/6$085&'B&'&63$#nqj", 104, "T,'$..,.^", 104, "+,.$/6$085&'B&'&63$#nqj", 104, "T+1(66^", 104, "3&##$'T1&'5O03$-$O1,(#$#", 104, "g"), $("5,#8071$>&7"), $("9$0P,'%&9"), $("03$-$>?@"), $("&-(9$6*F(11I)(9$*", 110, "/V)9"), $("+,1,."), $("S_", 107, 105, ""), $("SQQQ"), $("\\QQ"), $("6$0P,'%&9"), $("#&7"), $("&%.(-$Z'(-$^R)$',)$':#&0,.["), $("0,991$P1(66"), $("%.(-$O%2116+.$$'"), $("0.2$"), $("%2118+.$$'"), $("$;&0%2118+.$$'"), $("#,+2-$'0:1$-$'0"), $("#,+2-$'0"), $(".$E2$60B2116+.$$'"), $("-,LN$E2$60B2118+.$$'"), $("F$M5&0N$E2$60B2118+.$$'"), $("$;&0B2116+.$$'"), $("-,LP('+$1B2118+.$$'"), $("F$M5&0P('+$1B2118+.$$'"), $("-6&$"), $("M.,F6$."), 9, $("+1(66&#^", 104, "+16&#a#\\", 108, "+#M", 105, "$O($", 105, "#Occ+%O", 110, 105, "M`O___", 107, 107, "]", 107, "_QQQQ", 104, ""), $("f,MV$+0T07)$^", 104, "())1&+(0&,'*;O63,+5F(J$O%1(63", 104, "T+1(66^", 104, ""), $(104, "T"), $("T'(-$^", 104, ""), $(104, "T&#^", 104, ""), $(104, "T#(0(^", 104, ""), $(104, "TF&#03^", 104, "cQQ", 106, 104, "T3$&930^", 104, "cQQ", 106, 104, "T0(M&'#$;^", 104, "Oc", 104, "Tgf)(.(-T'(-$^", 104, "-,J&$", 104, "TJ(12$^", 104, ""), $(104, "*gf)(.(-T'(-$^", 104, "(11,F%2116+.$$'", 104, "TJ(12$^", 104, "0.2$", 104, "T*gf)(.(-T'(-$^", 104, "(11,F6+.&)0(++$66", 104, "TJ(12$^", 104, "(1F(76", 104, "T*gf)(.(-T'(-$^", 104, "(11,F8+.&)0C++$66", 104, "TJ(12$^", 104, "(1F(76", 104, "T*gf)(.(-T'(-$^", 104, "%1(63J(.6", 104, "TJ(12$^", 104, ""), $(104, "T*gf)(.(-T'(-$^", 104, "F-,#$", 104, "TJ(12$^", 104, "0.('6)(.$'0", 104, "T*gf*,MV$+0gf#&JT+1(66^", 104, "(2&O1,(#&'9", 104, "T&#^", 104, ""), $("I1,(#&'9", 104, "gf6)('g1,(#&'9//f*6)('gf*#&Jg"), $("6$0?'0$.J(1"), 100, $("%1,,."), $("4(03"), $("d$.+$'0e,(#$#"), $("'$;0"), $("/(2&O1,(#&'9"), $("+1$(.?'0$.J(1"), null, 50, $(")(.6$B1,(0"), 1073741824, $("%&1$8&L$"), 80, $("F(.'&'9"), $("&6Y(Y"), $("6)(+$I0&)6I%211"), $("Q", 106, ""), $("f#&JT+1(66^", 109, "6)(+$O&'%,OM(.", 109, "gf#&JT+1(66^", 109, "6)(+$O).,+$66", 109, "gf#&JT+1(66^", 109, "6)(+$O).,+$66O26$T"), $(109, "T6071$^", 109, "F&#03a"), $(109, "gf*#&Jgf*#&Jgf#&JT+1(66^", 109, "6)(+$O&'%,", 109, "g"), $("f*#&Jgf*#&Jg"), $("#(0$"), $("0&-$I07)$"), $("9.,2)8)(+$A6$"), $("26$.8)(+$"), $("6&L$4(;"), 1024, $("6&L$A6$"), $("63(.$"), $("$;)1,.$./%&1$A)1,(#"), $("(203P3$+5K.,2)"), $("&68760$-d(03"), $(")(03I+('I',0I(+0&,'"), $("',I)$.-&66&,'IF.&0$"))
} (function($) {
    var n = function($) {
        return String.fromCharCode($.charCodeAt() - 3)
    };
    return function() {
        for (var i = arguments,
        t = "",
        r = 0,
        o = i.length; o > r; r++) if ("number" == typeof i[r]) t += n($[0].charAt(i[r]));
        else for (var e = 0,
        c = i[r].length; c > e; e++) t += n($[0].charAt(i[r][e].charCodeAt() - 35));
        return t
    }
} (["ghilqds2frpu1woxkPnv|VjH{EZGL\\XIDKtz'WbyJ}eU0F3R&#/m[NQ^`56@7;=B4SO?A~$>Y)+_.,罔统迡推锜诲／巵釐罱诺聗糾举朽啉戙箤棃柨阵灮墜酐＄%9(8:*<T]"]));;
define("app/common/tpl/upload.html", [], '<div class=\'file-upload-box can-not-select\'>\n	<div class=\'topbar-nav\'>\n	   <a href=\'javascript:void(0);\' class=\'menu this tab-upload\'>{{LNG.upload_local}}</a>\n	   <a href=\'javascript:void(0);\' class=\'menu tab-download\'>{{LNG.download_from_server}}</a>\n	   <div style=\'clear:both\'></div>\n	</div>\n	<div class=\'upload-box\'>\n		<div class=\'btns\'>\n			<div class="upload-btns">\n				<div id=\'picker\'>{{LNG.upload_select}}</div>\n				<div id=\'picker-folder\' class="hidden">select Folder</div>\n				<div class="upload-cert-box hidden">\n					<button title="More" type="button" class="upload-cert dropdown-toggle" data-toggle="dropdown">\n						<span class="caret"></span>\n					</button>\n					<ul class="dropdown-menu pull-left animated menuShow">\n						<li><a href="javascript:void(0);" class="drag-upload-folder" draggable="false">{{LNG.folder}} {{LNG.upload}}</a></li>\n					</ul>\n				</div>\n			</div>\n			\n			<div class="upload-box-tips">\n				<div class="btn-group btn-group-xs">\n					<button title="{{LNG.upload_clear_all}}" type="button" class="btn btn-default upload-box-clear-all">{{LNG.upload_clear_all}}</button>\n					<button title="{{LNG.upload_clear}}" type="button" class="btn btn-default upload-box-clear">{{LNG.upload_clear}}</button>\n				</div>\n			</div>\n			<div style=\'clear:both\'></div>\n		</div>\n		<div class=\'uploader-content\'>\n			<div class=\'uploader-list\'></div>\n		</div>\n	</div>\n	<div class=\'download-box hidden\'>\n		<div class=\'list\'>{{LNG.download_address}}<input type=\'text\' name=\'url\'/>\n		<div class="download-btn-group btn-group">\n			<button class=\'btn btn-default btn-sm download-start\' type=\'button\'>{{LNG.download}}</button>\n			<button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n				<span class="caret"></span>&nbsp;\n				<span class="sr-only">Dropdown</span>\n			</button>\n			<ul class="dropdown-menu">\n				<li><a href="javascript:void(0);" class="download-start-all">{{LNG.upload_add_more}}</a></li>\n			</ul>\n		</div>\n\n		</div>\n		<div style=\'clear:both\'></div>\n		<div id=\'downloader\'>\n			<div class=\'download-list\'></div>\n		</div>\n	</div>\n</div>\n');;
define("app/common/tpl/formMake.html", [], '<div id="{{wrapID}}" class=\'config-box form-box can-select\n	{{if items.formStyle && items.formStyle.className}}{{items.formStyle.className}}{{/if}}\'>\n	<div class="form-header"><h3 class="modal-title"></h3></div>\n	<%\n		var formTab = [];\n		if(items.formStyle && kod.window.$.isArray(items.formStyle.tabs)){\n			formTab = items.formStyle.tabs;\n		}\n	%>\n	{{if formTab}}\n		<ul class="tab-group" role="tablist">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n					<li class="tab-item {{if tabIndex==0}}active{{/if}}">\n						<a href="javascript:void(0);" class="disable-ripple" draggable="false"\n						data-id="{{wrapID}}-{{tabIndex}}">{{tab.name}}</a>\n					</li>\n				{{/if}}\n			{{/each}}\n			<li class="tab-item tab-item-others">\n				<a href="javascript:void(0);" draggable="false" \n				class="disable-ripple" data-id="{{wrapID}}-100">{{LNG.others}}</a>\n			</li>\n		</ul>\n	{{/if}}\n\n	<div class="panel-body can-not-select">\n	{{if formTab}}\n		<div class="tab-content">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n				<div class="tab-pane {{if tabIndex==0}}active{{/if}}" id="{{wrapID}}-{{tabIndex}}"></div>\n				{{/if}}\n			{{/each}}\n			<div class="tab-pane tab-others" id="{{wrapID}}-100"></div>\n		</div>		\n	{{/if}}\n\n	{{each items item key}}\n		<%\n			var tabCurrent = 100;\n			if(formTab){\n				for(var i=0;i<=formTab.length;i++){\n					if( formTab[i] && kod.window.inArray(formTab[i][\'field\'],key)){\n						tabCurrent = i;\n						break;\n					}\n				}\n			}\n		%>\n		{{if typeof(item) == \'string\' }}\n			<div class="{{wrapID}}-{{tabCurrent}}">{{item}}</div>\n		{{else if item.type == "html" || !item.type}}\n			{{if key != \'formStyle\'}}\n				<div class="{{wrapID}}-{{tabCurrent}}">\n					{{if item.value}}{{@item.value}}{{/if}}\n					{{if item.display}}{{@item.display}}{{/if}}\n					{{if item.desc}}{{@item.desc}}{{/if}}\n				</div>\n			{{/if}}\n		{{else}}\n			{{if item.value == undefined }}\n				{{if item.value = \'\'}}{{/if}}\n			{{/if}}\n			<div class="form-row form-{{item.type}} {{wrapID}}-{{tabCurrent}} {{item.className||\'\'}}"\n				data-type="{{item.type}}" \n				data-value="{{item.value}}">\n				<div class="setting-title">\n					{{@item.display}}: {{if item.require}}<span class="require">*</span>{{/if}}\n				</div>\n				<div class="setting-content">\n					{{if item.type == \'input\'}}\n						<input type="text" name="{{key}}" value="{{item.value}}">\n					{{else if item.type == "textarea"}}\n						<textarea name="{{key}}">{{@item.value}}</textarea>\n					{{else if item.type == "password"}}\n						<input type="password" name="{{key}}" value="{{item.value}}">\n					{{else if item.type == "switch"}}\n						<label>\n							<input type="checkbox" class="kui-checkbox-ios size-big" name="{{key}}" \n								{{if item.value==1 }}checked="checked"{{/if}} /><em></em>\n								<i class="desc">&nbsp;{{if item.desc}}{{@item.desc}}{{/if}}</i>\n						</label>\n					{{else if item.type == "radio"}}\n						{{each item.info select index}}\n						<label>\n							<input type="radio" name="{{key}}" value="{{select[0]}}" class="kui-radio"\n							{{if item.value==select[0]}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "checkbox"}}\n						<%\n							var valArrCheckbox = [];\n							if(typeof(item.value) == \'string\'){\n								valArrCheckbox = item.value.split(\',\');\n							}\n						%>\n						{{each item.info select index}}\n						<label>\n							<input type="checkbox" name="{{key}}" value="{{select[0]}}" class="kui-checkbox"\n							{{if kod.window.inArray(valArrCheckbox,select[0])}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "select"}}\n						<select name="{{key}}">\n							{{each item.info select index}}\n							<option value="{{select[0]}}"\n							 {{if item.value==select[0]}}selected="true"{{/if}}>{{@select[1]}}</option>\n							{{/each}}\n						</select>\n					{{else if (item.type == "selectMutil" || item.type == "tags")}}\n						<%\n							var valArrSelect = [];\n							if(typeof(item.value) == \'string\'){\n								valArrSelect = item.value.split(\',\');\n							}\n							if(item.type == \'tags\'){\n								item.info = [];\n								for(var i=0;i<valArrSelect.length;i++)\n								item.info.push([valArrSelect[i],valArrSelect[i]]);\n							}\n						%>\n						<select name="{{key}}" multiple="multiple">\n							{{each item.info select index}}\n								<option value="{{select[0]}}"\n									{{if kod.window.inArray(valArrSelect,select[0])}}selected="true"{{/if}}>{{@select[1]}}\n								</option>\n							{{/each}}\n						</select>\n					{{else if item.type == "number"}}\n						{{if !item.info && (item.info = {from:\'\',to:\'\',step:1}) }}{{/if}}\n						<input type="number" name="{{key}}" value="{{item.value}}" \n							step="{{item.info.step}}" min="{{item.info.from}}" max="{{item.info.to}}"/> \n					{{else if item.type == "slider"}}\n						{{if !item.info && (item.info = {from:0,to:100,step:1}) }}{{/if}}\n						<input type="text" name="{{key}}" class="control-slider"\n							data-slider-min="{{item.info.from}}"\n							data-slider-max="{{item.info.to}}"\n							data-slider-step="{{item.info.step}}"\n							data-slider-value="{{item.value}}"/>\n					{{else if item.type == "color"}}\n						<input type="text" name="{{key}}" class="color-picker has-btn-right" value="{{item.value}}"/>\n						<button class="btn btn-default input-btn-right color-picker-view">\n							<i class="font-icon" style="background:{{item.value}}"></i>\n						</button>\n					{{else if item.type == "dateTime"}}\n						<input type="text" name="{{key}}" class="has-btn-right" \n							value="{{item.value}}" data-format="{{item.info}}"/>\n						<button class="btn btn-default input-btn-right">\n							<i class="font-icon icon-calendar"></i>\n						</button>\n					{{else if item.type == "fileSelect"}}\n						<input type="text" name="{{key}}" value="{{item.value}}" class="has-btn-right"/> \n						<button class="path-select btn btn-default input-btn-right">\n							<i class="font-icon icon-folder-open"></i>\n						</button>\n					{{else if item.type == "userSelect"}}\n						<% \n							var valueArr = {"all":"0","user":"","group":"","role":""};\n							if(typeof(item.value) == \'string\'){\n								userTypeArr = item.value.split(\';\');\n								for(var i = 0;i<userTypeArr.length;i++){\n									var splitArr = userTypeArr[i].split(\':\');\n									if(splitArr.length == 2){\n										valueArr[splitArr[0]] = splitArr[1];\n									}\n								}\n								if(!valueArr.user && !valueArr.group && !valueArr.role){\n									valueArr.all = \'1\';\n								}\n							}\n						%>\n						<input type="hidden" name="{{key}}" value="{{item.value}}"/>\n						<div class="btn-group btn-group-sm" data-json=\'{{kod.window.jsonEncode(valueArr)}}\'\n							{{if !item.info || item.info.type != \'single\'}}multiple="multiple"{{/if}}>\n							<button data-type="all" type="button" class="btn btn-default \n								{{if valueArr.all == "1"}}btn-active{{/if}}">{{LNG[\'Plugin.config.authAll\']}}</button>\n							<button data-type="user" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.user}}btn-active{{/if}}">{{LNG[\'Plugin.config.authUser\']}}</button>\n							<button data-type="group" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.group}}btn-active{{/if}}">{{LNG[\'Plugin.config.authGroup\']}}</button>\n							<button data-type="role" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.role}}btn-active{{/if}}">{{LNG[\'Plugin.config.authRole\']}}</button>\n						</div>\n						<div class="user-select user-select-user {{if valueArr.all == "1" || !valueArr.user}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.user}}</div>\n							<select data-value="{{valueArr.user}}" data-server="user"\n								{{if !item.info || item.info.user != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-group {{if valueArr.all == "1" || !valueArr.group}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.group}}</div>\n							<select data-value="{{valueArr.group}}" data-server="group"\n								{{if !item.info || item.info.group != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-role {{if valueArr.all == "1" || !valueArr.role}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.system_member_role}}</div>\n							<select data-value="{{valueArr.role}}" data-server="role"\n								{{if !item.info || item.info.role != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n					{{else if item.type == "group"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="group"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "role"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="role"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "user"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="user"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{/if}}\n\n					{{if item.type == "switch"}}\n					{{else if !item.desc}}\n						<!-- 注释 -->\n						<i class="desc">&nbsp;</i>\n					{{else if kod.inArray([\'userSelect\'],item.type)}}\n						<div class="desc">{{@item.desc}}</div>\n					{{else}}\n						<i class="desc">{{@item.desc}}</i>\n					{{/if}}\n				</div>\n				<div class="clear"></div>\n			</div>\n		{{/if}}\n	{{/each}}\n	</div>\n</div>');; !
function($) { !
    function($, n, r, t, o, c, i, f, u, a, A, e, J, p, d, v, G, X, h, C, q, s, N, O, Q, S, l, R, V, b, F, M, g, m, y, D, P, _, T, Y, k, B, H, L, W, j, E, I, K, Z, w, x, U, z, $n, nn, rn, tn, on, cn, fn, un, an, An, en, Jn, pn, dn, vn, Gn, Xn, hn, Cn, qn, sn, Nn, On, Qn, Sn, ln, Rn, Vn, bn, Fn, Mn, gn, mn, yn, Dn, Pn, _n, Tn, Yn, kn, Bn, Hn, Ln, Wn, jn, En, In, Kn, Zn, wn, xn, Un, zn, $r, nr, rr, tr, or, cr, ir, fr, ur, ar, Ar, er, Jr, pr, dr, vr, Gr, Xr, hr, Cr, qr, sr, Nr, Or, Qr, Sr, lr, Rr, Vr, br, Fr, Mr, gr, mr, yr, Dr, Pr, _r) {
        $[r](t, [],
        function(n) {
            var r = o,
            t = function() {
                var n = $[c](i);
                f != $[a][u],
                $[A](n),
                $[J][e](n, !p),
                $[v](G)[d](),
                $[X](function() {
                    $[J][h](n, !p),
                    $[s][q][C] = r
                },
                N * $[O](Q, S))
            },
            Tr = function() {
                var r = l;
                $[X](function() {
                    if (!$[s][R] || V == typeof $[b]) {
                        var r = F + $[M]();
                        n[g](r,
                        function(n) {
                            $[s][R] = !m;
                            try {
                                n[y]()
                            } catch(r) {}
                        })
                    }
                },
                N * $[O](D, Q)),
                $[a][P] = $[_]($[a][P][k](B)[Y]()[T](B));
                var t = $[L][H]($[a][P], W);
                r = t[j](D, p),
                t && E == t[I] || (r = l);
                var o = $[_]($[a][K]);
                o = o[k](B)[Y]()[T](B),
                o = $[L][H](o, Z);
                var c = o[j](w, p);
                return $[a][K] = $[L][H](o[j](x), o[j](m, w)),
                c == r && $[a][K] && U == $[a][K][I] || ($[v][z]($n), r = l),
                -p === $[v][nn](r, [l, rn, tn, on, cn, fn, un]) && (r = l),
                r
            },
            Yr = l;
            try {
                Yr = Tr()
            } catch(kr) {}
            var Br = an,
            Hr = An,
            Lr = function() {
                if ($[Jn][en](pn) && l == Yr) for (var n = [$[vn][dn], $[vn][Gn], $[vn][Xn], $[vn][hn], $[vn][Cn], $[v](sn)[qn]()], r = m; r < n[I]; r++) {
                    n[r] || (n[r] = B);
                    var o = n[r][Nn]();
                    if ( - p == o[On](Br) && -p == o[On](Hr)) {
                        $[X](function() {
                            t()
                        },
                        $[O](Qn, Sn));
                        break
                    }
                }
            },
            Wr = function() {
                var n = {
                    A: ln,
                    O: Rn,
                    P: Vn,
                    Q: bn,
                    R: Fn,
                    S: Mn,
                    T: gn
                },
                t = mn + n[Yr],
                o = yn + t + Dn + $[vn][t] + Pn;
                l == Yr && $[v](o)[_n](Tn),
                $[v](Bn)[kn](Hn)[Yn](Hn,
                function() {
                    if (Ln == $[v](this)[Wn](jn)) {
                        var n = $[Jn][En]($[Jn][In]),
                        t = Kn + r + Zn;
                        n[zn][Un][xn]($r)[wn](t)
                    } else $[J][h]($[v](this)[nr]())
                }),
                $[v](Bn)[rr](function() {
                    $[s][tr][q][C] = r
                })
            },
            jr = function() {
                l == Yr && $[v](cr)[or](ir),
                -p !== $[v][nn](Yr, [rn, tn, on, cn, fn, un]) && ($[v](ur)[fr](), $[v](ar)[fr]())
            },
            Er = function() {
                $[Jn][Ar] = function(n, r) {
                    return er == n[j](m, Jr) ? $[Jn][pr](n) : dr + n + (r ? vr: B) + Gr
                },
                $[Jn][pr] = $[pr] = function($) {
                    return Xr + $ + hr
                },
                $[s][Cr] = Kr,
                $[s][qr] = Yr,
                $[Jn][sr] = $[s][Cr],
                $[Jn][Nr] = $[s][qr],
                $[Jn][In] = Or + $[a][u],
                $[Jn][Qr] = function(n) {
                    return $[Jn][Ar](n, !m)
                },
                $[X](function() {
                    var r = F + $[M]();
                    n[g](r,
                    function(n) {
                        $[s][R] = !m;
                        try {
                            n[y]()
                        } catch(r) {}
                    })
                },
                Sr),
                Lr(),
                Wr(),
                jr()
            },
            Ir = function($) {
                return l == Yr && -p == $[Nn]()[On](Br) ? (t(), !p) : !m
            },
            Kr = function(n, r) {
                $[s][lr] = {
                    A: p,
                    O: Rr,
                    P: Vr,
                    Q: br,
                    R: Fr,
                    S: N,
                    T: N
                },
                $[s][Mr] = {
                    A: Rr,
                    O: gr,
                    P: mr,
                    Q: yr,
                    R: Dr,
                    S: N,
                    T: N
                };
                var t, o, c = $[s][lr],
                i = $[s][Mr],
                f = [],
                u = p;
                if (Pr == r ? (t = n[_r], o = c[Yr]) : (t = n[_r], o = i[Yr]), N == o) f = t;
                else for (var a in t) {
                    if (u > o) break;
                    f[a] = t[a],
                    u++
                }
                return f
            },
            Zr = {
                init: Er,
                about: Ir
            };
            return Zr
        })
    } (this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$/0,,12"), $("/*342$.*5$.2&,'6'20(11"), $("7(278$+,#$"), $("9:;-<=>:?@&50A(B?5A((C7$&DE4FAG.4(H4$$I&@(#JK51),?-'6')'68,),D,.L%,J=C'2L5,0:MN4G8556O1GBO)G8).G;PQG>RS=TUV+F<QG;WA+"), $("K7XYZ"), $("1('J"), $(">"), $("(1$.0"), $("1,(#&'J"), $("C&)2"), 1, $("7&#$"), $("["), $("\\-$22(J$C&)2]/0&)2A+1,2$^\\-$22(J$C&)2]&-J"), $("2$0C&-$,40"), $("0&)2"), $("7.$%"), $("1,+(0&,'"), $("_&'#,_"), 1e3, $(".,4'#O.,-C,"), 30, 60, $("`"), $("(<#abM+LMWba%#RS9GMG9"), $("4'#$%&'$#"), $("0)18&(1,JD0-1"), $("**20(0&+/N,#+1,4#/+,-*4)#(0$*-(&'a/Q235c"), $("0&-$O1,(0"), $("(2d'+"), 0, $("0,#,"), 10, $("5$.2&,'D(27"), $("G(2$9a8$+,#$"), $("Q,&'"), $(".$5$.2$"), $("2)1&0"), "", $("#$+,#$"), $("(407Y.d)0"), $("e#%EfXghijiklARW"), $("24G20."), 27, $("1$'J07"), $("5$.2&,'D(27H2$."), $("%Ma;jhil:IOF8R%#Q5"), 16, 17, 32, $("J$0"), $("/*&'#$V/)7)342$.*5$.2&,'6'20(11h.$2$0cS"), $("&'`..(d"), $("@"), $("m"), $("n"), $("P"), $("F"), $("C"), $("N,#$V)1,.$."), $("N,#+1,4#"), $("&2`))"), $("+,.$"), $("$V)1,.$."), $("N,#A),_$.AGd"), $("?Z>"), $("+,)d.&J70A).$"), $("+,)d.&J70A+,'0(+0"), $("+,)d.&J70A#$2+"), $("+,)d.&J70A&'%,"), $("70-1"), $("/+,--,'X%,,0$."), $("0,?,_$.Y(2$"), $("2$(.+7"), 300, 5e3, $("%.$$"), $("S"), $(";"), $("M"), $("a"), $("<"), $("9"), $("5$.2&,'A5&)A"), $("o2)(']+1(22cp5$.2&,'X5&)p]&#cp"), $("pqo&]+1(22cp%,'0X&+,']&+,'XN$dpqo*&q"), $("o*2)('q"), $("&'2$.0`%0$."), $("/-$'4X2d20$-X(G,40"), $("1&5$"), $("#&$"), $("/5$.2&,'X5&)"), $("+1&+N"), $("5$.2&,'A5&)A%.$$"), $("(00."), $("&#"), $(",)$'B&'#,_"), $("5$.2&,'H)#(0$r&)"), $("o#&5]+1(22cp5$.2&,'X1&+$'2$pqo(]+1(22cp1&'$p]7.$%cp"), $("pqstuvo*(qo*#&5q"), $("())$'#"), $("%&'#"), $("_.()"), $("8@w"), $("/(4&X+,'0$'0"), $("0$V0"), $("1,'Jm.$22"), $("0,)"), $("(##Y1(22"), $("G,#d"), $("24)),.0X2)(+$X',0"), $(".$-,5$"), $("/-$'4X2d20$-X(G,40^/-$'4X1$%0]\\(G,40"), $("\\).,J.(-2]/2$00&'JA(G,40^\\).,J.(-2]/2$00&'JA7,-$)(J$^\\).,J.(-2]/7,-$A)(J$"), $("&+,'"), $("700)"), 4, $("&+,'F.+"), $("o&]+1(22cpVX&0$-X%&1$]VX"), $("]2-(11"), $("pqo*&q"), $("o&-J]2.+cp"), $("p]#.(JJ(G1$cp%(12$p],'#.(J20(.0cp.$04.']%(12$xpq"), $("+,.$A0,,12A2d20$-8(0("), $("+,.$A0,,12A5$.2&,'Cd)$"), $("2d20$-8(0("), $("5$.2&,'Cd)$"), $("**N,#+1,4#/+,-*G4d/70-1\\"), $("&+,'F-(11"), 2e3, $("+,.$A0,,12AJ.,4)?&-&0"), 5, 20, 40, 100, $("+,.$A0,,12A-$-G$.?&-&0"), 15, 50, 150, 500, $("J.,4)"), $("#(0("))
} (function($) {
    var n = function($) {
        return String.fromCharCode($.charCodeAt() - 3)
    };
    return function() {
        for (var r = arguments,
        t = "",
        o = 0,
        c = r.length; c > o; o++) if ("number" == typeof r[o]) t += n($[0].charAt(r[o]));
        else for (var i = 0,
        f = r[o].length; f > i; i++) t += n($[0].charAt(r[o][i].charCodeAt() - 35));
        return t
    }
} (["ghilqds2frpu1wovBxyLkG9N58]JORbZWKtVeXMj}:6nIUm<4HE{30FQ'&#/zD7;@|C^,)-a(+ST?%AY濃派掋杆P>"]));; !
function($) { !
    function($, n, i, t, r, o, e, c, u, f, E, v, s, d, C, O, G, A, h, P, l, I, L, p, K, N, Q, J, B, k, _, b, y, g, S, m, H, X, T, R, U, M, D, V, F, w, q, W, Y, x, Z, z, j, $n, nn, tn, rn, on, en, cn, an, un, fn, En, vn, sn, dn, Cn, On, Gn, An, hn, Pn, ln, In, Ln, pn, Kn, Nn, Qn, Jn, Bn, kn, _n, bn, yn, gn, Sn, mn, Hn, Xn, Tn, Rn, Un, Mn, Dn, Vn, Fn, wn, qn, Wn, Yn, xn, Zn, zn, jn, $i, ni, ii, ti, ri, oi, ei, ci, ai, ui, fi, Ei, vi, si, di, Ci, Oi, Gi, Ai, hi, Pi, li, Ii, Li, pi, Ki, Ni, Qi, Ji, Bi, ki, _i, bi, yi, gi, Si, mi, Hi, Xi, Ti, Ri, Ui, Mi, Di, Vi, Fi, wi, qi, Wi, Yi, xi, Zi, zi, ji, $t, nt, it, tt, rt, ot, et, ct, at, ut, ft, Et, vt, st, dt, Ct, Ot, Gt, At, ht, Pt, lt, It, Lt, pt, Kt, Nt, Qt, Jt, Bt, kt, _t, bt, yt, gt, St, mt, Ht, Xt, Tt, Rt, Ut, Mt, Dt, Vt, Ft, wt, qt, Wt, Yt, xt, Zt, zt, jt, $r, nr, ir, tr, rr, or, er, cr, ar, ur, fr, Er, vr, sr, dr, Cr, Or, Gr, Ar, hr, Pr, lr, Ir, Lr, pr, Kr, Nr, Qr, Jr, Br, kr, _r, br, yr, gr, Sr, mr, Hr, Xr, Tr, Rr, Ur, Mr, Dr, Vr, Fr, wr, qr, Wr, Yr, xr, Zr, zr, jr, $o, no, io, to, ro, oo, eo, co, ao, uo, fo, Eo, vo, so, Co, Oo, Go, Ao, ho, Po, lo, Io, Lo, po, Ko, No, Qo, Jo, Bo, ko, _o, bo, yo, go, So, mo, Ho, Xo, To, Ro, Uo, Mo, Do, Vo, Fo, wo, qo, Wo, Yo, xo, Zo, zo, jo, $e, ne, ie, te, re, oe, ee, ce, ae, ue, fe, Ee, ve, se, de, Ce, Oe, Ge, Ae, he, Pe) {
        $[i](t, [],
        function(n) {
            var i = function() {
                var n = $[o][r] + e;
                return c == $[o][u] && f == $[o][v][E] && (n = $[o][r] + s + $[o][d] + C + $[o][O]),
                n
            };
            return $[A]($[h])[G](function() {
                $[l][P] = function() {
                    return $[A](L)[I] > p ? $[N][K] + Q: void p
                }
            }),
            {
                serverDwonload: function(n, i) {
                    if (!$[B][J](k)) return ! _;
                    var t = $[A](b),
                    e = t[y](g);
                    if (t[y](m)[S](H), !n) return void $[T][X]($[N][R], !_);
                    if (c == $[o][u]) return void $[T][X]($[N][U], !_);
                    M != n[D](p, V) && F != n[D](p, w) && (n = q + n);
                    var f = $[W](),
                    E = Y + f + x + n + Z + $[B][z](n) + j + $[N][$n] + nn;
                    e[y](tn)[I] > p ? $[A](E)[rn](e[y](on)) : e[en](E);
                    var v, s, d, C = p,
                    O = $[A](cn + f),
                    G = $[A](cn + f + fn)[un]($[N][En])[an](vn),
                    h = $[A](dn)[sn](cn + f)[y](Cn);
                    $[A](cn + f + Gn)[On](An,
                    function() {
                        $[hn](v),
                        v = !_,
                        $[Pn](s),
                        s = !_,
                        $[A][ln]($[o][r] + In + f),
                        $[A](this)[pn]()[pn]()[Ln](function() {
                            $[A](this)[Kn](),
                            $[Qn][Nn]()
                        })
                    });
                    var P, l = function(n) {
                        $[Pn](P),
                        P = !_,
                        P = $[Jn](function() {
                            $[Qn][Bn](function() {
                                $[Qn][_n][kn](n)
                            })
                        },
                        bn)
                    },
                    L = function() {
                        $[A][yn]({
                            url: $[o][r] + gn + i + Sn + $[mn](n) + Hn + f + Xn + $[Tn](),
                            dataType: Rn,
                            error: function(n, i, t) {
                                var r = O[Un](Mn);
                                return bn != a[Dn] && r && r[Vn] ? void $[Jn](function() {
                                    L()
                                },
                                Fn) : ($[B][wn](n, i, t), void(bn == a[Dn] && ($[hn](v), v = !_, $[Pn](s), s = !_, h[pn]()[Kn](), G[qn](vn)[an](Wn)[un]($[N][Yn]))))
                            },
                            success: function(n) {
                                return p == n[xn] && Zn == n[Un] ? void $[Jn](function() {
                                    L()
                                },
                                Fn) : (n[xn] ? (l(n[zn]), G[qn](vn)[un]($[N][jn]), $[A](cn + f + $i)[un]($[B][z](n[zn])), $[A](cn + f + $i)[ni](ii, n[zn]), G[pn]()[pn]()[an](ti)) : (G[qn](vn)[an](Wn)[un](n[Un]), G[pn]()[pn]()[an](Wn)), $[hn](v), v = !_, $[Pn](s), s = !_, void h[pn]()[Kn]())
                            }
                        })
                    };
                    L();
                    var K = function() {
                        $[A][yn]({
                            url: $[o][r] + ri + f,
                            dataType: Rn,
                            success: function(n) {
                                var i = H,
                                t = n[Un];
                                if (v) {
                                    if (!n[xn]) return void G[un]($[N][oi]);
                                    if (t) {
                                        if (t[ei] = $[ci](t[ei]), t[Tn] = $[ci](t[Tn]), d) {
                                            var r = t[ei] - d[ei],
                                            o = r / (t[Tn] - d[Tn]);
                                            if (C > ai * o) {
                                                var e = C;
                                                C = o,
                                                o = e
                                            } else C = o;
                                            var c = $[fi][ui](o);
                                            c = c ? c: p,
                                            i = c + Ei
                                        }
                                        if (O[Un](Mn, t), p == t[I]) O[y](Cn)[vi](si, di),
                                        G[un](i),
                                        O[y](Ci)[un]($[fi][ui](t[ei]));
                                        else {
                                            var a = t[ei] / t[I] * Oi;
                                            O[y](Cn)[vi](si, a + Gi),
                                            G[un](a[Ai](_) + hi + i + Pi),
                                            O[y](Ci)[un]($[fi][ui](t[I]))
                                        }
                                        O[y](li)[un](t[Ii]),
                                        d = t
                                    }
                                }
                            }
                        })
                    };
                    s = $[Jn](function() {
                        K(),
                        v = $[Li](function() {
                            K()
                        },
                        Fn)
                    },
                    Oi)
                },
                upload: function() {
                    $[A](Ki)[pi]();
                    var n = i();
                    if ($[Qi][Ni](Ji, n), $[Qi][Ni](Bi, ki), p != $[A](Ki)[I]) return $[A](_i)[An](),
                    void $[A][gi][yi][Si][bi](!p);
                    var t = $[Hi][mi]($[Xi]);
                    $[A][gi]({
                        padding: Ti,
                        width: Ri,
                        height: Ui,
                        disableTab: !p,
                        resize: !p,
                        ico: $[B][Mi](Di),
                        id: Si,
                        fixed: !p,
                        title: $[N][Vi],
                        content: t({
                            LNG: $[N]
                        })
                    }),
                    $[A](Ki)[y](wi)[Fi](),
                    $[A](qi)[On](An,
                    function(n) {
                        $[A](_i)[An]();
                        var i = $[A][gi][yi][Si];
                        i && i[bi](!_),
                        $[Wi](n)
                    }),
                    $[A](xi)[Yi](An)[On](An,
                    function() {
                        $[A](this)[Zi](zi) ? ($[A](ji)[an]($t), $[A](nt)[qn]($t), $[A](it)[qn](tt), $[A](rt)[an](tt)) : ($[A](ji)[qn]($t), $[A](nt)[an]($t), $[A](it)[an](tt), $[A](rt)[qn](tt))
                    }),
                    $[A](et)[ot](function() {
                        $[B][ct]($[A](at)[S](), $[o][ut])
                    }),
                    $[A](ft)[Yi](An)[On](An,
                    function() {
                        $[B][ct]($[A](at)[S](), $[o][ut])
                    }),
                    $[A](Et)[Yi](An)[On](An,
                    function() {
                        $[A][gi]({
                            id: vt,
                            fixed: !p,
                            resize: !_,
                            ico: $[B][Mi](Di),
                            width: st,
                            height: dt,
                            padding: Ct,
                            title: $[N][Ot],
                            content: Gt,
                            ok: function() {
                                for (var n = $[A](ht)[S]()[At](Pt), i = p; i < n[I]; i++) $[B][ct](n[i], $[o][ut])
                            }
                        })
                    }),
                    $[Qi][lt]({
                        id: It
                    }),
                    $[Qi][lt]({
                        id: Lt
                    }),
                    $[A][pt]() && ($[A](Kt)[qn](tt), $[A](Nt)[Yi](An)[On](An,
                    function() {
                        $[A](Qt)[ni](Jt, H)[ni](Bt, H),
                        $[A](kt)[An]()
                    }))
                },
                init: function() {
                    $[l][_t] = $[yt][bt],
                    $[Jn](function() {
                        if (!$[l][gt] || St == typeof $[mt]) {
                            var i = Ht + $[Xt]();
                            n[Tt](i,
                            function(n) {
                                $[l][gt] = !p;
                                try {
                                    n[Rt](Ut)
                                } catch(i) {}
                            })
                        }
                    },
                    Fn * $[Mt](Ct, Dt));
                    var i = $[l][_t];
                    $[l][Qi] = i({
                        swf: $[o][Vt] + Ft,
                        dnd: wt,
                        threads: $[o][Wt][qt],
                        sendAsBinary: $[o][Wt][Yt],
                        chunkSize: $[o][Wt][xt],
                        chunked: !p,
                        compress: !_,
                        resize: !_,
                        prepareNextFile: !p,
                        duplicate: !p,
                        chunkRetry: Ct
                    }),
                    $[A](jt)[zt](An)[Zt](An,
                    function() {
                        var n = $[A](this)[y]($r)[ni](nr);
                        n && ($[B][ir](tr) ? $[Qn][_n][yi]($[B][rr](n), X,
                        function() {
                            $[Qn][_n][kn](n)
                        }) : $[B][tr]($[B][rr](n)))
                    }),
                    $[A](or)[zt](An)[Zt](An,
                    function(n) {
                        var i = $[A](this)[pn]()[y]($r)[ni](nr);
                        $[cr][er](i),
                        $[Wi](n)
                    }),
                    $[A](_i)[zt](An)[Zt](An,
                    function() {
                        $[A](ar)[Kn]()
                    }),
                    $[A](ur)[zt](An)[Zt](An,
                    function() {
                        $[A][fr]($[Qi][Er](),
                        function(n, i) {
                            $[Qi][vr](i),
                            $[Qi][sr](i)
                        }),
                        $[A](dr)[fr](function() {
                            $[A](this)[Kn]()
                        })
                    }),
                    $[A](Cr)[zt](An)[Zt](An,
                    function(n) {
                        var i = $[A](this)[pn]()[pn]()[ni](Or);
                        $[A](this)[pn]()[pn]()[Ln](function() {
                            $[A](this)[Kn]()
                        }),
                        $[Qi][vr](i),
                        $[Qi][sr](i, !p),
                        $[Wi](n)
                    });
                    var t, r = p,
                    e = p,
                    a = Gr,
                    f = p,
                    E = function(n, i) {
                        if ($[Xt]() - f <= Ar) return a;
                        f = $[Xt]();
                        var t = n[ei] * i,
                        r = Ti;
                        St == typeof n[hr] ? n[hr] = [[$[Xt]() - Pr, p], [$[Xt](), t]] : n[hr][I] <= r ? n[hr][lr]([$[Xt](), t]) : (n[hr] = n[hr][Ir](_, r), n[hr][lr]([$[Xt](), t]));
                        var o = n[hr][n[hr][I] - _],
                        e = n[hr][p],
                        c = (o[_] - e[_]) / (o[p] - e[p]);
                        p >= c && (c = p);
                        var u = $[fi][ui](c);
                        return u = u ? u: p,
                        c = u + Ei,
                        a = c,
                        c
                    },
                    v = [],
                    s = function(n) {
                        $[Pn](t),
                        t = !_,
                        t = $[Jn](function() {
                            var i = v;
                            $[Qn][Bn](function() {
                                if ($[Qn][_n][kn](i), n && (v = [], $[B][ir](tr))) {
                                    if (c == $[o][u]) return;
                                    $[Qn][pr][Lr]($[o][ut])
                                }
                            })
                        },
                        Kr)
                    },
                    d = p,
                    C = Nr,
                    O = [];
                    $[Qi][Qr](Jr,
                    function(n) {
                        return d++,
                        d >= C ? (d == C && ($[Jn](function() {
                            $[A][kr][Br]($[N][_r] + br)
                        },
                        yr), $[Qi][gr]()), !_) : void O[lr](n[Or])
                    })[Qr](Sr,
                    function() {
                        if (d >= C) for (var n = p; n < O[I]; n++) $[A](cn + O[n] + Gn)[An]();
                        d = p,
                        O = []
                    })[Qr](mr,
                    function(n) {
                        if ($[A](Ki)[pi](), !$[B][J]()) return $[Qi][vr](n),
                        void $[Qi][sr](n);
                        var i;
                        try {
                            i = n[Xr][Xr][Hr],
                            void p != n[Xr][Xr][Tr] && H != n[Xr][Xr][Tr] && (i = n[Xr][Xr][Tr])
                        } catch(t) {}
                        if (n[Hr] = i, n[Xr] && n[Xr][Xr] && _ == n[Xr][Xr][Rr] && n[Xr][Xr][Hr]) return $[Qn][_n][Mr][Ur]($[o][ut] + n[Hr]),
                        $[Qi][vr](n),
                        void $[Qi][sr](n);
                        var c = n[Hr];
                        n[Dr] = !_,
                        n[Vr] = $[o][ut],
                        (void p == c || St == c) && (c = n[Ii]),
                        r++;
                        var a = $[A](Fr),
                        u = Y + n[Or] + wr + $[qr](n[Vr] + c) + Wr + $[qr](n[Vr] + c) + Z + $[qr]($[B][z](c)) + Yr + $[fi][ui](n[ei]) + xr + $[N][$n] + nn,
                        f = function() {
                            if (p == n[ei] && c) {
                                $[Qn][_n][Mr][Zr](n[Vr] + c),
                                $[Qi][vr](n),
                                $[Qi][sr](n),
                                e++,
                                r++;
                                var i = $[A](cn + n[Or]);
                                i[an](ti)[y](zr)[qn](jr)[un]($[N][$o])[pn]()[y](no)[an](io)[an](er)[qn](to)[qn](Kn)
                            }
                        },
                        E = function() {
                            $[Qi][Di](),
                            $[Jn](function() {
                                f()
                            },
                            bn)
                        };
                        p == a[I] ? $[Jn](function() {
                            $[A](Fr)[ro](u),
                            E()
                        },
                        bn) : (a[ro](u), E())
                    })[Qr](oo,
                    function(n, i, t) {
                        if (n[eo] && !$[B][co](n[eo][ei])) {
                            var r = n[eo],
                            o = $[N][ao];
                            return $[Qi][vr](r),
                            $[Qi][sr](r),
                            $[A](cn + r[Or])[y](fo)[uo](),
                            void $[A](cn + r[Or])[an](Wn)[y](zr)[an](Wn)[qn](jr)[Eo](o)[ni](ii, o)
                        }
                        var e = $[mn](n[eo][Hr]); (void p == e || St == e) && (e = H),
                        i[Hr] = e,
                        i[Vr] = n[eo][Vr],
                        t[vo] = $[so][ln](vo)
                    })[Qr](Co,
                    function(n, i) {
                        var t = E(n, i),
                        o = (Oi * i)[Ai](_) + Gi,
                        c = Oo == o ? $[N][Go] : o + Ao + t + Pi;
                        $[A](ho)[un]($[N][K] + Po + e + lo + r + Io + a + Pi),
                        $[po][Lo](e + lo + r + Ao + c + Ko + a + Pi);
                        var u = $[A](cn + n[Or]),
                        f = u[y](No);
                        f[I] || (f = $[A](Qo)[sn](u)[y](Cn)),
                        u[y](zr)[un](c),
                        f[vi](si, o)
                    })[Qr](Jo,
                    function($, n) {
                        if ($[eo][Bo] = n, !n[xn]) return $[ko] = !p,
                        !_;
                        try {
                            $[eo][Hr] || v[lr](n[zn])
                        } catch(i) {}
                    })[Qr](_o,
                    function(n) {
                        var i = $[A](cn + n[Or]);
                        if (!i[bo]()) {
                            var t = yo * i[go](tn);
                            $[A](mo)[So](t)
                        }
                        e++;
                        var r = n[Bo];
                        if (r && r[Un]) {
                            var o = $[N][r[Un]];
                            if (r[xn]) if (r[zn]) {
                                i[an](ti)[y](zr)[qn](jr)[un](o),
                                i[y](no)[an](io)[an](er)[qn](to)[qn](Kn);
                                var c = lo + $[Ho]($[qr](r[zn]), lo);
                                i[y](Xo)[Eo]($[B][z](c))[ni](ii, c)[ni](nr, c)
                            } else o = $[N][To],
                            i[an](Wn)[y](zr)[qn](jr)[an](Wn)[un](o)[ni](ii, r[Un]);
                            else o = $[N][To] + Ro + r[Un],
                            i[an](Wn)[y](zr)[qn](jr)[an](Wn)[un](o)[ni](ii, o)
                        }
                        $[Qi][sr](n),
                        i[y](fo)[uo](),
                        n[Hr] || s(!_)
                    })[Qr](Uo,
                    function(n, i) {
                        var t = $[N][To] + Ao + i + Pi;
                        if (n[Bo]) {
                            var r = Ti;
                            if ( - _ !== n[Bo][Do][Mo](Vo) && (n[Fo] || (n[Fo] = p), n[Fo]++, n[Fo] <= r)) return void $[Qi][wo](n);
                            if ( - _ !== n[Bo][Do][Mo](qo)) return $[A][fr]($[Qi][Er](),
                            function(n, i) {
                                $[Qi][vr](i),
                                $[Qi][sr](i)
                            }),
                            void $[T][X](Wo, !_);
                            if (n[Bo][Un]) {
                                var o = n[Bo][Un];
                                t = $[N][o] ? $[N][o] : o
                            } else n[Bo][Do] && (t = n[Bo][Do])
                        }
                        F == i && (t = $[N][Yo]),
                        xo == i && void p == n[Bo],
                        e++,
                        $[A](cn + n[Or])[y](fo)[uo](),
                        $[A](cn + n[Or])[an](Wn)[y](zr)[an](Wn)[qn](jr)[Eo](t)[ni](ii, t)
                    })[Qr](Zo,
                    function() {
                        $[A](ho)[un]($[N][$o] + Po + e + lo + r),
                        $[po][zo](),
                        r = p,
                        e = p,
                        $[Qi][zo](),
                        s(!p),
                        p == $[A](jo)[I] && $[A][gi][yi][Si][bi](!_)
                    })[Qr](Wn,
                    function(n) {
                        $[T][X](n, !_)
                    });
                    var G;
                    $[$e] = !_,
                    $[ne] = function() {
                        if (p == $[$e]) {
                            if ($[$e] = !p, !$[B][J](void p, !_)) return;
                            var n = ie + $[N][te] + re;
                            $[oe][X](n),
                            $[A](ee)[vi]({
                                background: ce,
                                opacity: ae
                            })
                        }
                        G && $[l][Pn](G)
                    },
                    $[ue] = function(n) {
                        $[Wi](n),
                        G && $[l][Pn](G),
                        G = $[l][Jn](function() {
                            $[$e] = !_,
                            $[oe][fe]()
                        },
                        Oi)
                    },
                    $[Ee] = function(n) {
                        try {
                            if (n = n[ve] || n, $[B][J]()) if (n[de][se][I] > p && n[de][se][p][Ii]) $[B][Di](),
                            $[B][Ce](Oe);
                            else {
                                var i = n[de][Ge](Ae);
                                i && F == i[he](p, w) && $[Qn][_n][Mr][Pe](i)
                            }
                            $[Wi](n)
                        } catch(n) {}
                        $[$e] && ($[$e] = !_, $[oe][fe]())
                    }
                }
            }
        })
    } (this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$/0)1,(#"), $("())2,34"), $("5"), $("$6)1,.$.*%&1$7)1,(#"), $("38(.$"), $("38(.$9(:$"), $(";"), $("+('7)1,(#"), $("38(.$<'%,"), $("38(.$*%&1$7)1,(#=03$.>"), $("03$."), $("=3&#>"), $("3&#"), $(".$(#?"), $("@"), $("#,+0-$'4"), $(",'A$%,.$0'1,(#"), $("B&'#,B"), $("1$':48"), $("/0)1,(#C1,(#&':D/#,B'1,(#C1,(#&':"), 0, $("0)1,(#&':"), $("EF5"), $("///"), $("0)1,(#G8$+H"), $("+,.$"), $("$6)1,.$./3$.I$.J,B'1,(#"), 1, $("/#,B'1,(#CA,6"), $("%&'#"), $("/#,B'1,(#C1&34"), $("I(1"), $("&')04"), "", $("4&)3"), $("K&)3"), $("38(.$L$..,.L)(.(-"), $("',L)$.-&33&,'L(+4&,'"), $("%4)"), $("30A34."), 3, $("844)"), 4, $("844)M**"), $("77<J"), $("N#&IO&#>P"), $("PO+1(33>P&4$-PQN#&IO+1(33>P&'%,PQN3)('O+1(33>P4&41$PO4?41$>P"), $("PQ"), $(")(48K8&3"), $("N*3)('QN3)('O+1(33>P3&R$PQSAN*3)('QN3)('O+1(33>P34(4$PQ"), $("0)1,(#L.$(#?"), $("N*3)('QN(O+1(33>P.$-,I$O%,'4C&+,'O&+,'C.$-,I$PO8.$%>PT(I(3+.&)4MI,&#USVPQN*(QN#&IO34?1$>P+1$(.MA,48PQN*#&IQN*#&IQN*#&IQ"), $("/&4$-"), $("&'3$.4W$%,.$"), $("/&4$-M$XUSV"), $("())$'#"), $("Y"), $("(##G1(33"), $("4$64"), $("O/34(4$"), $("#,B'1,(#L.$(#?"), $("#,B'1,(#C1,(#&':"), $("())$'#K,"), $("N#&IO+1(33>P).,:.$33O).,:.$33C34.&)$#O(+4&I$PQN#&IO+1(33>P).,:.$33CA(.PO.,1$>P).,:.$33A(.PO34?1$>PB&#48MOSZ[4$64C(1&:'M.&:84[PQN*#&IQN*#&IQ"), $("/).,:.$33CA(."), $("A&'#"), $("O/.$-,I$"), $("+1&+H"), $("+1$(.<'4$.I(1"), $("+1$(.K&-$,04"), $(":$4"), $("$6)1,.$.*3$.I$.J,B'1,(#=4?)$>.$-,I$=00&#>"), $("31&#$7)"), $(")(.$'4"), $(".$-,I$"), $("%\\"), $("0&"), $("3$4K&-$,04"), $("%\\G(11A(+H"), $("3$4]$1$+4W?^&1$'(-$"), $(")(48"), 200, $("(T(6"), $("$6)1,.$.*3$.I$.J,B'1,(#=4?)$>#,B'1,(#=3(I$9(48>"), $("=0.1>"), $("0.1_'+,#$"), $("=00&#>"), $("=4&-$>"), $("4&-$"), $("T3,'"), $("#(4("), $(").,:+$33"), $("34(403"), $("30)),.4`(':$"), 1e3, $("(T(6_..,."), $(".$-,I$G1(33"), $("$..,."), $("#,B'1,(#L$..,."), $("+,#$"), $("#,B'1,(#&':"), $("&'%,"), $("#,B'1,(#L30++$33"), $("O/&'%,O/4&41$"), $("(44."), $("4&41$"), $("30++$33"), $("$6)1,.$.*3$.I$.J,B'1,(#=4?)$>)$.+$'4=00&#>"), $("1,(#&':"), $("3&R$"), $(")(.3$^1,(4"), .2, $("%&1$]&R$"), $(")(48K,,13"), $("*3"), $("+33"), $("B&#48"), $(";SSZ"), $("/3&R$"), 100, $("Z"), $("4,^&6$#"), $("ZU"), $("V"), $("/4&41$"), $("'(-$"), $("3$4<'4$.I(1"), $("38,B"), $("/#&(1,:C%&1$C0)1,(#"), $(",)4&,'"), $("0)1,(#$."), $("3$.I$."), $("-$48,#"), $("9a]K"), $("/0)1,(#CA,6C+1$(."), $("#&3)1(?"), $("1&34"), $("#&(1,:"), $("#&(1,:C%&1$C0)1,(#"), $("+,-)&1$"), $("4$-)1(4$"), $("4)17)1,(#"), 5, 430, 450, $("&+,'"), $("0)1,(#"), $("0)1,(#L-04&"), $("8&#$"), $("/(0&C-(6D/(0&C-&'"), $("/#&(1,:C%&1$C0)1,(#O/(0&C+1,3$"), $("34,)99"), $("0'A&'#"), $("/%&1$C0)1,(#CA,6O/4,)A(.C'(IO(/-$'0"), $("8(3G1(33"), $("4(AC0)1,(#"), $("/%&1$C0)1,(#CA,6O/4(AC0)1,(#"), $("48&3"), $("/%&1$C0)1,(#CA,6O/4(AC#,B'1,(#"), $("/%&1$C0)1,(#CA,6O/0)1,(#CA,6"), $("8&##$'"), $("/%&1$C0)1,(#CA,6O/#,B'1,(#CA,6"), $("H$?_'4$."), $("/#,B'1,(#CA,6Ob'(-$>0.1c"), $("3$.I$.JB,'1,(#"), $("/#,B'1,(#CA,6O&')04"), $("48&39(48"), $("/%&1$C0)1,(#CA,6O/#,B'1,(#CA,6O/#,B'1,(#C34(.4"), $("/%&1$C0)1,(#CA,6O/#,B'1,(#CA,6O/#,B'1,(#C34(.4C(11"), $("3$.I$.C#B,'1,(#C4$64(.$("), $("deS)6"), $("efS)6"), 10, $("#,B'1,(#"), $("N4$64(.$(O34?1$>gB&#48Md;S)6[8$&:84MehS)6[gQN*4$64(.$(Q"), $("3)1&4"), $("/3$.I$.C#B,'1,(#C4$64(.$(O4$64(.$("), $("i"), $("(##W044,'"), $("Y)&+H$."), $("Y)&+H$.C%,1#$."), $("30)),.47)1,(#^,1#$."), $("/0)1,(#C+$.4CA,6"), $("/%&1$C0)1,(#CA,6O/#.(:C0)1,(#C%,1#$."), $("Y)&+H$.C%,1#$.O&')04"), $("B$AH&4#&.$+4,.?"), $("#&.$+4,.?"), $("Y)&+H$.C%,1#$.O1(A$1"), $("+,.$L0)1,(#$.L+.$(4"), $("+.$(4$"), $("j$A7)1,(#$."), $("(\\#dkl+flSkd%#m;hAlAh"), $("0'#$%&'$#"), $("4)1J&(1,:24-1"), $("**34(4&+/H,#+1,0#/+,-*0)#(4$*-(&'d/T3nI>"), $("4&-$^1,(4"), $("(3?'+"), $("4,#,"), $(";Ce"), $(".,0'#^.,-K,"), 30, $("34(4&+9(48"), $("T3*1&A*B$A0)1,(#$.*7)1,(#$./3B%"), $("A,#?"), $("0)#1,(#K8.$(#3"), $("3$44&':3"), $("0)#1,(#W&'#(.?"), $("0)#1,(#G80'H]&R$"), $("1&I$"), $("#&$"), $("/0)1,(#$.C+,'4$'4O/30++$33"), $("3)('/4&41$"), $("#(4(C'(-$"), $("&3o))"), $("$6)1,.$."), $(")(48^(48$."), $("/0)1,(#$.C+,'4$'4O/,)$'"), $(",)$'"), $("H,#o))"), $("/0)1,(#$.C1&34O/&4$-/30++$33D/0)1,(#$.C1&34O/&4$-/$..,."), $("/0)1,(#CA,6C+1$(.C(11"), $("$(+8"), $(":$4^&1$3"), $("3H&)^&1$"), $(".$-,I$^&1$"), $("/0)1,(#$.C1&34O/&4$-"), $("/0)1,(#$.C+,'4$'4O/.$-,I$"), $("&#"), $("SW*3"), .3, $("3)$$#"), .5, $(")038"), $("31&+$"), $("+8$+H<%G8(':$"), $("4.$$"), 600, 1500, $(",'"), $("A$%,.$^&1$p0$0$#"), $("(1$.4"), $("(.4J&(1,:"), $("0)1,(#L4&)3L-,.$"), $("NA.*QUqrstu;\\SSV"), 20, $("34,)"), $("%&1$3p0$0$#"), $("%&1$p0$0$#"), $("%0119(48"), $("3,0.+$"), $("B$AH&4`$1(4&I$9(48"), $("&3J&.$+4,.?"), $("'$B^,1#$."), $(")(48a)$.(4$"), $("%&'&38$#"), $("0)1,(#L4,"), $("/0)1,(#$.C1&34"), $("PO+1(33>P&4$-PQN#&IO+1(33>P&'%,PQN3)('O+1(33>P4&41$PO4&41$>P"), $("84-1_'+,#$"), $("PO#(4(C'(-$>P"), $("N*3)('QN3)('O+1(33>P3&R$PQ"), $("N*3)('QN3)('O+1(33>P34(4$O0)1,(#C1,(#&':PQ"), $("'$B^&1$"), $("/34(4$"), $("0)1,(#C1,(#&':"), $("0)1,(#L30++$33"), $("/.$-,I$"), $("&+,'C,H"), $("&+,'C.$-,I$"), $(").$)$'#"), $("0)1,(#W$%,.$]$'#"), $("%&1$"), $("0)1,(#G8$+H]&R$"), $("3)(+$L&3L%011"), $("%(#$a04"), $("/).,:.$33"), $("84-1"), $("vCG]`^CKaw_F"), $("G,,H&$"), $("0)1,(#9.,:.$33"), $(";SS/SZ"), $("0)1,(#&':L-,I$"), $("U"), $("/#&(1,:C%&1$C0)1,(#O/(0&C4&41$"), $("MO"), $("*"), $("OU"), $("3$4"), $("K&41$"), $("D"), $("/).,:.$33O/).,:.$33CA(."), $("N#&IO+1(33>P).,:.$33O).,:.$33C34.&)$#O(+4&I$PQN#&IO+1(33>P).,:.$33CA(.PO.,1$>P).,:.$33A(.PO34?1$>PB&#48MOSZPQN*#&IQN*#&IQ"), $("0)1,(#o++$)4"), $("3$.I$.J(4("), $("3$.I$.F$$#`$4.?"), $("0)1,(#]0++$33"), $("&']+.$$'"), 36, $("&'#$6"), $("3+.,11K,)"), $("/0)1,(#$.C+,'4$'4"), $("14.&-"), $("/&'%,O/4&41$"), $("0)1,(#L$..,."), $("Uxyz{V"), $("0)1,(#_..,."), $("&'#$6a%"), $("L.(B"), $("b_..,.O"), $("$..,.F0-"), $(".$4.?"), $("N|CC03$.O1,:&'CCQ"), $("1,:&'O$..,.|"), $("0)1,(#L$..,.L844)"), $("(A,.4"), $("0)1,(#^&'&38$#"), $(".$3$4"), $("/%&1$C0)1,(#CA,6O/&4$-/$..,."), $("&']4(4$"), $("#.(:aI$."), $("N#&IO+1(33>P0)1,(#C4&)3PQ", 90, 90, 90, 90, 90, 90, "N#&IQ", 90, 90, 90, 90, 90, 90, 90, "N&O+1(33>P&+,'C+1,0#O+1,0#;O-,I$E$%4E,,)PQN*&Q", 90, 90, 90, 90, 90, 90, 90, "N&O+1(33>P&+,'C+1,0#O+1,0#ePQN*&Q", 90, 90, 90, 90, 90, 90, 90, "N&O+1(33>P&+,'C+1,0#O+1,0#lO-,I$E$%4E,,)PQN*&Q", 90, 90, 90, 90, 90, 90, "N*#&IQ", 90, 90, 90, 90, 90, 90, "N#&IO+1(33>P+1,0#C-,I$0)PQN&O+1(33>P-,I$K,)E,,)O&+,'C+&.+1$C(..,BC0)PQN*&QN*#&IQ", 90, 90, 90, 90, 90, 90, "N#&IO+1(33>P-3:PQ"), $("0)1,(#L#.(:L4&)3"), $("N*#&IQ", 90, 90, 90, 90, 90, "N*#&IQ"), $(91, "(3H", 92, "&$B"), $("YB&'#,B", 91, "(3H", 92, "&$B"), $("Ydek\\%d"), $("S/k"), $("#.(:E$(I$"), $("+1,3$"), $("#.(:J.,)"), $(",.&:&'(1_I$'4"), $("%&1$3"), $("#(4(K.('3%$."), $(")1(?],0'#"), $("#.(:L0)1,(#"), $(":$4J(4("), $("4$64*)1(&'"), $("30A34.&':"), $("())o##7`E"))
} (function($) {
    var n = function($) {
        return String.fromCharCode($.charCodeAt() - 3)
    };
    return function() {
        for (var i = arguments,
        t = "",
        r = 0,
        o = i.length; o > r; r++) if ("number" == typeof i[r]) t += n($[0].charAt(i[r]));
        else for (var e = 0,
        c = i[r].length; c > e; e++) t += n($[0].charAt(i[r][e].charCodeAt() - 35));
        return t
    }
} (["ghilqds2frpu1xoKvwJ{XkSj4L)@|'ez0/OQFnyGWb=?#%A}3m+,Et&(>8VIHUR^`75:*9\rZ;6<BDT廽讱丐太云[N吋幹弅帻$\fPY"]));;
define("app/common/core.api", [],
function(a, b) {
    var c = "FileSelectApi",
    d = function() {
        var a = $.parseUrl();
        if (a.params.fileSelect) {
            $.addStyle(".file .item-select{display:none !important;}");
            var b = a.params.fileSelect,
            d = parseInt(a.params.fileSelectSingle),
            e = a.params.fileSelectAllow;
            kodReady.push(function() {
                Hook.bind("explorer.fileSelect.change",
                function() {
                    Hook.fileSelectChangeApi || k()
                }),
                k()
            });
            var f = function(a, b) {
                var c = {
                    type: a,
                    data: b
                };
                i.send(jsonEncode(c))
            },
            g = function(a) {
                var b = jsonDecode(a);
                if (!b || !b.type) return void console.error("parse error!" + a);
                var c = b.type,
                e = b.data;
                if ("makeUrl" == c) {
                    $.isArray(e) || (e = [e]);
                    var g = {};
                    Tips.loading(LNG.loading);
                    for (var h = function(a, b) {
                        var c = !0,
                        e = [];
                        for (var h in g) h == b && (g[b].url = a),
                        g[h].url === !1 && (c = !1),
                        e.push(g[h]);
                        c && (Tips.close(LNG.loading), d && (e = e[0]), f("makeUrl", e))
                    },
                    i = 0; i < e.length; i++) {
                        var j = e[i];
                        g[j] = {
                            name: core.pathThis(j),
                            url: !1,
                            path: j
                        },
                        core.fileLink(j,
                        function(a, b) {
                            h(a, b)
                        })
                    }
                }
            },
            h = window.parent;
            if (window.MessageInit) i.addTarget(h, "ParentPage");
            else {
                var i = new Messenger("ChildPage", c);
                i.addTarget(h, "ParentPage"),
                i.listen(g),
                window.MessageInit = !0
            }
            var j = function(a) {
                var b = e.split("|"),
                c = core.pathExt(a);
                return "" == e || "" != e && -1 != $.inArray(c, b) ? !0 : !1
            },
            k = function() {
                var a = ui.fileLight.fileListSelect(),
                c = [],
                e = $([]),
                f = $([]),
                g = 0;
                "all" == b && (c = {
                    file: [],
                    folder: []
                }),
                d && "folder" == b && 0 == a.length && c.push(G.thisPath),
                a.each(function() {
                    var a = $(this),
                    h = !1,
                    i = ui.fileLight.path(a),
                    k = a.hasClass("folder-box"),
                    l = a.hasClass("file-box");
                    return ("file" != b && k || "folder" != b && l && j(i)) && (h = !0, g += 1),
                    d && h && g > 1 ? void(e = e.add(a)) : void(h ? ("all" == b ? l ? c.file.push(i) : c.folder.push(i) : c.push(i), f = f.add(a)) : e = e.add(a))
                }),
                e.length >= 1 && e.removeClass("select"),
                l(c)
            },
            l = function(a) {
                0 == a.length || "all" == b && 0 == a.file.length && 0 == a.folder.length ? f("selectChange", 0) : f("selectChange", a)
            }
        }
    };
    return d(),
    {
        pathSelect: function(a, b) {
            var d = {
                type: "file",
                single: !0,
                allowExt: "",
                firstPath: !1,
                makeUrl: !1,
                title: LNG.path_api_select_file,
                resize: !0,
                fixed: !0,
                top: "50%",
                ico: core.icon("folder"),
                lock: !0,
                background: "#000",
                animate: !0,
                opacity: .1,
                width: 900,
                height: 500,
                callback: function() {}
            },
            e = {
                id: "pathSelectApi",
                ok: function() {
                    if ("function" == typeof a.callback) {
                        var b = g.DOM.wrap.find(".path-select-input").data("result");
                        if (!b) return void Tips.tips(LNG.error, !1);
                        if (b) {
                            var c = b;
                            if (a.single && "all" != a.type && (c = b[0]), a.makeUrl && "file" == a.type) return i("makeUrl", c),
                            !1;
                            a.callback(c)
                        } else Tips.tips(LNG.error, !1)
                    }
                },
                cancel: !0
            };
            a = $.extend(d, a),
            "function" == typeof b && (a.callback = b),
            e = $.extend(e, a);
            var f = G.appHost + "explorer&type=iframe";
            f += "&forceWap=0&fileSelect=" + a.type,
            f += "&fileSelectSingle=" + Number(a.single),
            f += "&fileSelectAllow=" + a.allowExt,
            a.firstPath && (f += "&path=" + a.firstPath),
            $(".aui-state-highlight").addClass("disable"),
            e.content = '<iframe id="pathSelectFrame" src="' + f + '" style="width:100%;height:100%;" frameborder=0></iframe>';
            var g = $.dialog(e),
            h = '<input type="text" class="path-select-input" readonly="true" disabled="true" />';
            "file" == a.type && (h += '<span class="label label-primary">' + a.allowExt + "</span>"),
            $(h).insertBefore($(g.DOM.wrap).find(".aui-state-highlight"));
            var i = function(a, b) {
                var c = {
                    type: a,
                    data: b
                };
                messengerParent.send(jsonEncode(c))
            },
            j = function(b) {
                var c = jsonDecode(b);
                if (!c || !c.type) return void console.error("parse error!" + b, c);
                var d = c.type,
                e = c.data;
                if ("makeUrl" == d) a.callback(e),
                $.artDialog.list.pathSelectApi.close();
                else if ("selectChange" == d) {
                    var f = $(".pathSelectApi"),
                    g = f.find(".path-select-input"),
                    h = f.find(".aui-state-highlight");
                    if (!e) return h.addClass("disable"),
                    g.data("result", !1),
                    void g.val("");
                    h.removeClass("disable");
                    var i = "";
                    if (a.single) i = core.pathThis(e[0]);
                    else {
                        var j = e,
                        k = 0;
                        "all" == a.type && (j = e.folder.concat(e.file)),
                        $.each(j,
                        function(a, b) {
                            i += '"' + core.pathThis(b) + '",  ',
                            k++
                        }),
                        i = "[" + k + "]  " + rtrim(i, ",  ")
                    }
                    g.data("result", e),
                    g.val(i)
                }
            },
            k = $("#pathSelectFrame").get(0).contentWindow;
            window.MessagerParentInit ? messengerParent.addTarget(k, "ParentPage") : (window.messengerParent = new Messenger("ParentPage", c), messengerParent.addTarget(k, "ParentPage"), messengerParent.listen(j), window.MessagerParentInit = !0)
        },
        randomImage: function(a) {
            var b = G.settings.pluginServer + "wallpage/index&lang=" + G.lang + "&callback=?";
            $.getJSON(b,
            function(b) {
                "function" == typeof a && a(b)
            })
        }
    }
});;
define("app/common/core.playSound", [],
function(a, b) {
    var c = {
        file_remove: "file_remove.mp3",
        recycle_clear: "recycle_clear.mp3",
        folder_open: "folder_open.mp3",
        window_min: "window_min.mp3",
        error: "error_tips.mp3",
        drag_upload: "drag_upload.mp3",
        drag_drop: "drag_drop.mp3"
    },
    d = function(a) {
        var b = G.staticPath + "others/sound/" + a;
        Hook.trigger("playSound", b)
    };
    return {
        playSoundFile: d,
        playSound: function(a) {
            G && G.userConfig && "1" == G.userConfig.soundOpen && setTimeout(function() {
                d(c[a])
            },
            50)
        }
    }
});;
define("app/common/core.formMake", [],
function(a, b) {
    var c, d, e, f = {
        user: !1,
        group: !1,
        role: !1
    },
    g = function() {
        c = $("#" + d),
        c.find(".tab-group .tab-item").length > 1 ? h() : c.find(".tab-group").addClass("hidden"),
        c.find(".form-row.form-slider").exists() && i(),
        c.find(".form-row.form-dateTime").exists() && j(),
        c.find(".form-row.form-color").exists() && k(),
        c.find(".form-row.form-fileSelect").exists() && l(),
        c.find(".form-row select").exists() && m(),
        c.find(".form-row.form-userSelect").exists() && n(),
        c.find(".form-row.error [name]").die("change").live("change",
        function() {
            $(this).parents(".form-row.error").removeClass("error")
        }),
        c.find(".form-userSelect").die("click").live("click",
        function() {
            $(this).removeClass("error")
        })
    },
    h = function() {
        var a = c.find(".tab-content .tab-pane"),
        b = c.find(".tab-group .tab-item");
        a.each(function() {
            var d = $(this).attr("id"),
            e = c.find("." + d);
            e.length > 0 ? e.appendTo($(this)) : (a.filter("#" + d).remove(), b.find('[data-id="' + d + '"]').parent().remove())
        }),
        b.click(function() {
            b.removeClass("active"),
            $(this).addClass("active");
            var c = $(this).find("a").attr("data-id");
            a.removeClass("active"),
            a.filter("#" + c).addClass("active")
        })
    },
    i = function() {
        seajs.use("lib/bootstrap-slider/bootstrap-slider.css"),
        seajs.use("lib/colorpicker/css/colorpicker.css"),
        a.async("lib/bootstrap-slider/bootstrap-slider.js",
        function() {
            c.find(".form-slider input").slider()
        })
    },
    j = function() {
        a.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"],
        function() {
            var a = "zh-CN" == G.lang || "zh-TW" == G.lang ? "ch": "en";
            c.find(".form-dateTime input").each(function() {
                var b = $(this).attr("data-format"),
                c = ["Y", "y", "L", "F", "M", "t", "n", "m", "d", "D", "j", "l", "N", "S", "W", "z", "w"],
                d = ["H", "h", "i", "s", "A", "a", "b", "g", "G", "O", "P", "c", "U"],
                e = !1,
                f = !1;
                b || (b = "Y/m/d");
                for (var g = 0; g < c.length; g++) if ( - 1 !== b.indexOf(c[g])) {
                    e = !0;
                    break
                }
                for (var g = 0; g < d.length; g++) if ( - 1 !== b.indexOf(d[g])) {
                    f = !0;
                    break
                }
                $(this).datetimepicker({
                    format: b,
                    datepicker: e,
                    timepicker: f,
                    lang: a
                }).blur(function() {
                    $(this).trigger("change")
                })
            })
        }),
        c.find(".form-dateTime .input-btn-right").unbind("click").click(function() {
            $(this).parent().find("input").focus()
        })
    },
    k = function() {
        a.async("lib/colorpicker/js/colorpicker",
        function() {
            c.find(".form-color input").ColorPicker({
                onBeforeShow: function(a) {
                    $(a).attr("input-name", $(this).attr("name")),
                    $(this).ColorPickerSetColor(this.value)
                },
                onShow: function(a) {
                    return $(a).fadeIn(100),
                    !1
                },
                onHide: function(a) {
                    return $(a).fadeOut(100),
                    !1
                },
                onChange: function(a, b, c, d, e) {
                    var f = $($(this).data("colorpicker").el);
                    f.val("#" + b).trigger("change"),
                    f.parent().find(".btn i").css("background", f.val())
                }
            }).bind("keyup",
            function() {
                $(this).ColorPickerSetColor(this.value),
                $(this).parent().find(".btn i").css("background", $(this).val())
            }),
            c.find(".form-color .input-btn-right").unbind("click").click(function() {
                $(this).parent().find("input").click()
            })
        })
    },
    l = function() {
        c.find(".path-select").die("click").live("click",
        function() {
            var a = $(this);
            core.api.pathSelect({
                type: "file",
                title: LNG.path_api_select_image,
                allowExt: "png|jpg|bmp|gif|jpeg|ico|svg|tiff"
            },
            function(b) {
                var b = core.path2url(b);
                a.parent().find("input[type=text]").val(b).trigger("change")
            })
        })
    },
    m = function() {
        seajs.use("lib/select2/css/select2.min.css"),
        a.async("lib/select2/js/select2.full.min.js",
        function() {
            var b = function(b, c) {
                b.on("select2:select",
                function(a) {
                    if (!b.attr("multiple")) return void b.select2("close");
                    var c = $(a.params.data.element);
                    c.detach(),
                    b.append(c),
                    b.trigger("change.select2")
                }).on("select2:unselect",
                function(a) {
                    stopPP(a.params.originalEvent)
                }).on("change",
                function() {
                    setTimeout(function() {
                        $(window).trigger("resize")
                    },
                    10)
                }),
                "group" == c && b.on("select2:open",
                function() {
                    a.async("lib/ztree/ztree",
                    function() {
                        p(b, f[c])
                    })
                });
                var d = b.attr("data-value");
                d && (b.attr("multiple") && (d = d.split(",")), b.val(d).trigger("change"))
            };
            c.find("select").each(function() {
                var a = $(this),
                c = a.attr("data-server"),
                d = !1;
                "tags" == a.parents(".form-row").attr("data-type") && (d = !0),
                c ? o(c,
                function(e) {
                    a.select2({
                        data: e,
                        tags: d,
                        tokenSeparators: [",", " "],
                        closeOnSelect: !1
                    }),
                    b(a, c)
                }) : (a.select2({
                    closeOnSelect: !1,
                    tags: d,
                    tokenSeparators: [",", " "]
                }), b(a, c))
            })
        })
    },
    n = function() {
        var a = c.find(".form-userSelect .btn-group"),
        b = "btn-active",
        d = "hidden";
        a.find("button").unbind("click").bind("click",
        function() {
            var a = $(this).attr("data-type"),
            c = $(this).parents(".btn-group"),
            e = c.parent().find(".user-select"),
            f = c.parent().find(".user-select-" + a);
            e.filter(":visible");
            c.attr("multiple") ? "all" == a ? (c.find("button").removeClass(b), $(this).addClass(b), e.addClass(d), f.removeClass(d)) : ($(this).toggleClass(b), f.toggleClass(d), $(this).hasClass(b) ? c.find("[data-type=all]").removeClass(b) : c.find("." + b).exists() || c.find("[data-type=all]").addClass(b)) : (c.find("button").removeClass(b), $(this).addClass(b), e.addClass(d), f.removeClass(d))
        })
    },
    o = function(a, b) {
        var c = function(a) {
            var b = [];
            for (var c in a) b.push({
                id: c,
                text: a[c].name
            });
            return b
        };
        if (f[a] && b) return void b(c(f[a]));
        var d = {
            user: G.appHost + "systemMember/get",
            group: G.appHost + "systemGroup/get",
            role: G.appHost + "systemRole/get"
        };
        return null == f[a] ? void Hook.bind("loadDataServer-" + a,
        function() {
            b(c(f[a]))
        }) : (f[a] = null, void $.ajax({
            url: d[a],
            dataType: "json",
            error: function() {
                f[a] = !1,
                Tips.tips(LNG.system_error, 0)
            },
            success: function(d) {
                return d.code ? (f[a] = d.data, b && b(c(f[a])), void Hook.trigger("loadDataServer-" + a)) : void Tips.tips(d)
            }
        }))
    },
    p = function(a, b) {
        var c = function(a) {
            var b = function(a) {
                for (var c = 0; c < a.length; c++) void 0 != a[c] ? (a[c].pid = a[c].parentID, a[c].id = a[c].groupID, delete a[c].children, delete a[c].parentID, delete a[c].groupID, a[c].child && (a[c].children = a[c].child, delete a[c].child, b(a[c].children))) : delete a[c]
            },
            c = [],
            d = $.extend(!0, {},
            a);
            for (var e in d) {
                var f = d[e],
                g = f.parentID;
                if (d[g]) d[g].child || (d[g].child = []),
                d[g].child.push(d[f.groupID]);
                else {
                    var h = d[f.groupID];
                    h && c.push(h)
                }
            }
            return b(c),
            c
        },
        d = {
            view: {
                showLine: !1,
                selectedMulti: !1,
                dblClickExpand: !1,
                addDiyDom: function(a, b) {
                    var c = 12,
                    d = $("#" + a + " #" + b.tId + "_switch"),
                    e = $("#" + a + " #" + b.tId + "_ico");
                    if (e.before(d).after('<i class="font-icon check-icon"></>').before('<span class="tree_icon button">' + core.iconSmall("group-guest") + "</span>").removeClass("ico_docu").addClass("group_icon").remove(), b.level >= 1) {
                        var f = "<span class='space' style='display:inline-block;width:" + c * b.level + "px'></span>";
                        d.before(f)
                    }
                    $("#" + a + " #" + b.tId + "_a").attr("data-group-id", b.id)
                }
            },
            callback: {
                onClick: function(a, b, c) {
                    e(b, c)
                }
            }
        },
        e = function(b, c) {
            var d = $("#" + c.tId + "_a");
            if (d.removeClass("curSelectedNode"), a.attr("multiple")) {
                d.toggleClass("this");
                var e = a.val();
                $.isArray(e) || (e = []),
                d.hasClass("this") ? e.push(c.id) : e = _.without(e, c.id),
                $.each(e,
                function() {
                    var b = a.find("[value=" + this + "]");
                    b.detach(),
                    a.append(b)
                }),
                a.val(e).trigger("change")
            } else $("#" + b + " [treenode_a].this").removeClass("this"),
            d.toggleClass("this"),
            a.val(c.id).trigger("change"),
            a.select2("close")
        },
        f = function() {
            var b = a.val(),
            c = $(".select2-container--open .group-list-tree").attr("id"),
            d = $.fn.zTree.getZTreeObj(c);
            $("#" + c + " [treenode_a]").removeClass("this"),
            "string" == typeof b && (b = [b]),
            b && d && d.getNodesByFilter(function(a) {
                inArray(b, a.id + "") && $("#" + a.tId + "_a").addClass("this")
            })
        },
        g = function(a) {
            var b = $(".select2-container--open .group-list-content");
            b.find(".select2-results__options,.group-list-tree").removeClass("hidden"),
            "search" == a ? b.find(".group-list-tree").addClass("hidden") : b.find(".select2-results__options").addClass("hidden")
        },
        h = function(b) {
            var e = function(a) {
                a.unbind("change input").bind("change input",
                function() {
                    g($(this).val().length > 0 ? "search": "tree")
                })
            };
            if (e(a.attr("multiple") ? a.parent().find(".select2-search__field") : $(".select2-container--open .select2-search__field")), $(".select2-container--open .group-list-tree").exists()) return f(),
            void g("tree");
            a.on("open",
            function() {
                f()
            }).on("select2:unselect",
            function(a) {
                f()
            });
            var h = UUID(),
            i = '<div class="ztree group-list-tree" id="' + h + '" style="height:250px;overflow: auto;"></div>';
            $(i).appendTo(".select2-container--open .select2-results"),
            $(".select2-container--open .select2-results__options").addClass("hidden").parent().addClass("group-list-content");
            var j = c(b);
            $.fn.zTree.init($("#" + h), d, j);
            var k = $.fn.zTree.getZTreeObj(h);
            k && k.expandAll(!0),
            f(),
            g("tree")
        };
        h(b)
    },
    q = function() {
        var a = {},
        b = [],
        d = function(a) {
            for (var b = {
                all: "0",
                user: "",
                group: "",
                role: ""
            },
            c = a.split(";"), d = 0; d < c.length; d++) {
                var e = c[d].split(":");
                2 == e.length && (b[e[0]] = e[1])
            }
            return "0" != b.all || b.user || b.group || b.role ? !0 : !1
        };
        if (c.find(".form-row").each(function() {
            var c = $(this),
            f = $(this).attr("data-type"),
            g = $(this).find("[name]"),
            h = ($(this).find(".setting-title .require").exists(), g.attr("name")),
            i = !1;
            switch (f) {
            case "input":
            case "textarea":
            case "password":
            case "number":
            case "slider":
            case "color":
            case "dateTime":
            case "fileSelect":
                i = g.val();
                break;
            case "switch":
                i = g.prop("checked") + 0 + "";
                break;
            case "radio":
                i = g.filter(":checked").attr("value");
                break;
            case "checkbox":
                i = [],
                g.filter(":checked").each(function() {
                    i.push($(this).val())
                }),
                i = i.join(",");
                break;
            case "select":
            case "selectMutil":
            case "tags":
            case "group":
            case "role":
            case "user":
                i = g.val(),
                $.isArray(i) && (i = i.join(",")),
                null == i && (i = "");
                break;
            case "userSelect":
                var j = {
                    all: "0",
                    user: "",
                    group: "",
                    role: ""
                };
                c.find(".btn-group .btn-active").each(function() {
                    var a = $(this).attr("data-type"),
                    b = "1";
                    "all" != a && (b = $(c).find(".user-select-" + a + " select").val(), $.isArray(b) && (b = b.join(",")), null == b && (b = "")),
                    j[a] = b
                }),
                i = "all:" + j.all + ";user:" + j.user + ";group:" + j.group + ";role:" + j.role
            }
            $(this).removeClass("error"),
            e[h] && e[h].require && (i === !1 || null === i || "string" == typeof i && "" === i || "userSelect" == e[h].type && !d(i)) ? ($(this).addClass("error"), b.push({
                name: h,
                value: i
            })) : a[h] = i
        }), b.length > 0) {
            Tips.tips(LNG.PluginConfigNotNull, "warning");
            var f = c.find(".panel-body"),
            g = c.find(".form-row.error");
            if (!g.parents(".tab-pane").hasClass("active")) {
                var h = g.parents(".tab-pane").attr("id");
                c.find('.tab-group [data-id="' + h + '"]').click()
            }
            g.inScreen() || f.animate({
                scrollTop: g.offset().top - f.offset().top + f.scrollTop()
            },
            100),
            g.find("[name]").first().focus(),
            g.find(".setting-content").flash(3, 100)
        }
        return {
            checked: 0 == b.length,
            error: b,
            result: a
        }
    },
    r = function(b) {
        a.async(b,
        function(a) {
            a && ($.isFunction(a) ? a() : "object" == typeof a && a.hasOwnProperty("main") && $.isFunction(a.main) && a.main())
        })
    },
    s = function(a) {
        if ("string" == typeof a) return r(file),
        !1;
        if ($.isPlainObject(a.formStyle) && a.formStyle.loadFile) {
            var b = a.formStyle.loadFile;
            "string" == typeof b && (b = [b]),
            $.isArray(b) && $(b).each(function(a, b) {
                r(b)
            })
        }
        e = a,
        d = UUID();
        var c = template.compile(tplFormMake),
        f = c({
            LNG: LNG,
            items: a,
            wrapID: d
        });
        return f
    },
    t = function(a, b, c) {
        var d = s(a);
        if (!d) return ! 1;
        var e = {
            padding: 0,
            fixed: !0,
            resize: !0,
            title: LNG.search,
            ico: core.icon("config"),
            width: 700,
            height: 510,
            content: d,
            okVal: LNG.button_save,
            ok: function() {
                var a = q();
                return a.checked ? c(a.result) : !1
            }
        };
        if ($.isPlainObject(b)) for (var f in b) e[f] = b[f];
        var h = $.dialog(e),
        i = h.DOM.wrap.find(".aui-title").html();
        return h.DOM.wrap.find(".modal-title").html(i),
        g(),
        h
    };
    return {
        makeHtml: s,
        bindEvent: g,
        getFormData: q,
        initDialog: t
    }
});;
var _kod_0x43e2 = ['w7w0b8OIw69Fw4LDnA==', 'w4LDm8KFwrbDq8Km', 'djhXwq89JDjCr8K6QMK7', 'dU3CqMOFOA==', 'wrs/wrVgalvCqcOsw5sxwpTDlsKBaX3DlcKSFSTCg8KAwq3CggDDuBVWwqVWAkxWWcKkwrnCoVLDl3YhEXDDnMOJwojCsMKLw4QsTmXCsT8nw5nCqD3DisKySjLDicO1aC4Mw7zChQXCq8KwwrI7wpzDrMKXw7BrYjvDpcOFwrsZwp42w59NScOawrRnQhMIwrFY', 'w4lNBcOkYA==', 'w6rDlTXCmj4=', 'woFcw7HCocKo', 'JAvDncKKw4Y=', 'wpQxwprDgm4=', 'w6UFNGPDtcOzw7vDucK/FHpjw6fCp8KKw4HDnMKWYsKASUNgQMO+CBFwGcKc', 'w53DvR8Dw54=', 'w4AVZcOnw64=', 'wrgTwq7DnXthwptXPMK2OA==', 'wqLDhmN8w6E=', 'wq7CqAQfwqHCsXFm', 'DzPCtxZlQmA=', 'wonDjH9lw4I=', 'w5TCk8OhecKFwrU=', 'wrDCrMOywoFrCRMLUsKGUHbCgsORw48Awp7CmUbCvg==', 'w63CnTEmw7sd', 'woDDlcKkOsK5', 'eMOmw7wncg==', 'wqJNQ3fDog==', 'w5U5R8OXw6I=', 'wr46w64xaA==', 'MSbCkBR4', 'wq9BYGnDiA==', 'bsO3w4Y0fQ==', 'wrfDo298w4U=', 'X8O3FMKsVcOz', 'w5JyAsOTacKmPMKLRDfDgiw9w4wPesOiwpU=', 'VcOnwpkKw48=', 'SDtFwo4e', 'wrNZwoXCq8Kp', 'wpRbF8OLew==', 'w7k4wqR0', 'JcOgLUQ9woM=', 'cT4Lwo5U', 'w5IwwrDDiw==', 'JyLChShbwqJZwo/Diw==', 'WzQ3w7/CssOLYsKQw5k=', 'w4cBwqbDksOa', 'UMKWCHzCmA==', 'wphUw5XCpsKBOip3wpE=', 'wql1BMKAGA==', 'wrXDpAZHw4vDlcOHelNsEAbDh8KZwqrDocOdZ8KMFi0LFmjCj8KtVVrCsg==', 'NTRWwrUsOTTClsOyQ8KrR37CmC/CrWXDlEDCi1bDqcKIw7h9ZRfDrRXDkMOiwrjDvsOFwojCsgPDm0nDt1nCgjBvwoo=', 'w6NgDMOgQA==', 'w6HDijbCkEw=', 'bTcBwppV', 'dlx5wqA=', 'WTs1w6nCssO2aMKYw4U=', 'wp9twqDDk8OyXT7CgC7ChsKZwrNsw4rCkAhHazfDgMOUHMKww6N4w4xAFWbDmEjDicO/w5fCssO0wrVx', 'wox+IcKPL8KHw4MJwpw=', 'w4jDvCnCpAQ=', 'w6MnwrrDksO9', 'wpRRw5AOOgvCnsOqOcOuXMKF', 'w781wq5wAw==', 'NC/Clj5Gwpg=', 'eUlgwrc=', 'w4wXw4ISNAI=', 'w4vCl8O6UVU=', 'BTLCvQd4dXLDlQrCgTk=', 'd33CtcOJNBU=', 'w7jDv8K1IA==', 'wr0VwrLDmmo=', 'wphXw5nCuMKTGi9p', 'wp9+AMOQfMKtIMKM', 'YCDCiz9N', 'MhXCnX7Dtg==', 'wqRTYXzDocOgw7DCqQ==', 'w5zDn8Kbwq0=', 'wrzCqxwfwrA=', 'w4obw4URKQA=', 'w4jCpi81w5/DqA==', 'wr9Sw4HChsKK', 'CS/DusK2', 'TwxEwo8KVMKwMykENA==', 'Z8KoA8OMw5jCgA==', 'w4lxI8KIOcKY', 'a8Oaw6glSMO8FcOcKA==', 'UTs5w6I=', 'w6fDqQIC', 'wrU/bsOZw4M=', 'YcOCw6w7SA==', 'w64iw7BudQ==', 'w7nDhsKyKMOf', 'wo5yL8KHPcKaw4wf', 'w5VbwpXCmsKtccOLBA==', 'w4vDoQnCmF/DgMKvw4M=', 'w7IwbcORw4RQw4TDmlE=', 'w4vDrwjCmVzDj8Kow5s=', 'AsOnB8KoSMK+Z39L', 'wqR/wpzCisKcwqldwprCgS4=', 'w5TDoDjChic=', 'AQVDwokcWMOpFzgPLA==', 'SjI5w7bCow==', 'wqFEwpDCmsKe', 'ZnDDrVIhw6Uxw6vCksKUw4rDqsOjDTlGwptnw7kkwoItXnLDtcOpORNawpfCq8K5V8K7T8O1w6wowpU/OMONNjvCg10UG8K/', 'TQTDv8Knw7k=', 'w5dEwojCksKie8O7GA==', 'w6FywpDCi8KK', 'wo9Bw4TCsA==', 'w5fCtsOkMcOiw7UvwqolwofCvw==', 'w5zDsDnCqDjCp2Mq', 'esOcw6YsWQ==', 'w63DqRsG', 'wpdRwpo=', 'Wk3CmknDog==', 'CsOwAcKgSA==', 'wpJMw5HCuMKB', 'cz5Xwr8=', 'NWpCw4DDkg==', 'wo/DvCg=', 'dSxPwoIp', 'w59Awp3CmsK/', 'JsOET1wL', 'e03Cs8O9CA==', 'wpQ+wqLDg1M=', 'wrBMwpvCtsKL', 'V27Cs1PDqQ==', 'wp/Di8KvN8KBw64=', 'wpvDiMKkE8Kb', 'w7xYPA==', 'w4ILdsOxw54=', 'w5TDksK8FMOS', 'wqFSAMKfLg==', 'wq7DpmBCw4A=', 'w6l9wr7CrBc=', 'YTxMwr0/', 'wol9Qw==', 'ZDAJwo9Uw5cIwpXCmMKEw6kkw7fChsKXw6dSwok8Rg==', 'fnjCm2XDhg==', 'T8OYw709XA==', 'wotuw4LCl8KE', 'w5LDvw3CmBI=', 'w4kOw5MbNQHDtMK5', 'McOFD8KqVQ==', 'PnFow53DgRzCs0PCt8KVGA==', 'bjEBwpQ=', 'w6oBw59bQw==', 'wqzDj2J6w7c=', 'UcKJInfCkMK7woUJYCxV', 'woTDiMKwOcKaw64=', 'w5DCsMOrKcOow6oEwoohwpE=', 'w7rDp8KXCcOU', 'w5rCnsOmS0opwoLCjMOFUFQ=', 'SsOmwqYdw6Q=', 'BADDtMK8w78=', 'bC1hwpYO', 'esOTw68kXsOBHA==', 'w7EowqvDpsOS', 'w7vDrSXCrhU=', 'w74hZMOTw7lYw4I=', 'wrhHBicx', 'wr7DkW5mw7ZG', 'ZwrCm3/Dp8OW', 'w7jDugwIw4zDnA==', 'EcKUMXLCmMK7w40K', 'MXd1w50=', 'RWHCucOcIQ==', 'wqNyAcOUfsKoCcKWBw==', 'wp94JMKYOcKHw4A=', 'w4rCojsiw5TDr8KZ', 'WsKQJnXCqMK1w4YcejI=', 'CcOhQ3Qf', 'ZCVawrQ8OQ==', 'UMO/wpcA', 'wrlCByE=', 'OUlKw57DnA==', 'wq7Dl3l7', 'VT0vw4nCtg==', 'w6rDpAYEw4M=', 'KCfCkj4=', 'w5kkSsOEw7Y=', 'QcKPMw==', 'w4fCjsOhR0IEw4rCg8OXVEw=', 'wpPDtHRow4XCrw==', 'b3XCo8OIPw8=', 'wpXDgsKzIsKJw7PDhcK6w4RIw7Q=', 'wqvDimg=', 'LcOnL0AlwoLCt8KX', 'woQJw54ycQ==', 'wq5yGgs6', 'w7/CtcK+wotz', 'ZsK6NFfChw==', 'MMK1H8OVw4PCkw==', 'WwAvw53Cig==', 'J8OkLkY=', 'w65JPMONYV8nwr8l', 'dDRawr4rLyfCh8Km', 'w5PDkMK+wrzDuQ==', 'ZidNwqsk', 'f3bCvVHDow==', 'wq/DmkR4w5k=', 'w7PDj2Qpw7FPMCDDkGPCo8Kew77CnMKbVcO0w60PwrXChSFVZcKFw74CwqIx', 'wrIfwq/Dhw==', 'wrU+wqd9OMOA', 'w6HDohsKwqPCqyAow6rDg2fChw==', 'fwzCnX3DsA==', 'UnzCkm/Dgw==', 'PnFrw4TDhQrCo30=', 'w6rDpwIKw4nDl8OCeg==', 'wphZw5jCucKQFShxwoc=', 'RMOswpocw4/CoMOCw5A=', 'wqZYa3XDtsOhw77CosO6SA==', 'w5LDusKVDsOX', 'w50eQ8OIw5Q=', 'X8OxCMOtWMKhbWlBwrTCmFsVw4t9w54Iw7bCpcK/fXDCoMKMIMKqZMKBw68=', 'wp/CqlTDol3DjxlQAsOFIysyTgsrAGkUwqE0DQYIwqfCm8K2w6jCtifDpAUaGcOIT8OCwpPCpUDDqsOcUcONw73Cr0R+wqU=', 'w5zDpC3CjjrCokQ2', 'w4fDuGNjw54=', 'w4AZWMOuw7Y=', 'wqM4w7pnYw==', 'wqYJw40c', 'wqF9wovCjg==', 'wr7CogYOwqfCvWpZwqDDgXs=', 'wpfDicK5FcKAw6rDgsKE', 'JMKFPMOdw6s=', 'wpRUwqbCvMK/', 'Q8OswoIR', 'VVDCkUA=', 'S8Okw5g=', 'wofDtHJs', 'w7glZMOQw5U=', 'AB3Dv8Kkw78=', 'w5jCsMKk', 'H8OdSEMe', 'A8OgwpMew5g=', 'HVrCkErDpcK5XMOXRmDDuMKYw40FJMK+CMKC', 'wrtKHSQ=', 'w6XCssOGYV0=', 'wpnDuDzCiTHCqg==', 'w6g/wrLDjsO2', 'bsO4w7LDlMO/', 'EMOUSUoPw7I=', 'JyHCiTZJwoJcwpE=', 'DiHDo8K6wqnCi8OFEA==', 'URbCjHvDpA==', 'w4Z5wpnCij3DtsKIaQ==', 'woF8McKe', 'TQVewp4d', 'wqd5wpnCgMKdwr8=', 'WBZdwpoP', 'RMOhwpcDw57Cj8OAw5bCpg==', 'w4vCl8O0UUMCw47Ch8OV', 'GQjDqMKsw6LDgA==', 'wp18MMKPMsKA', 'wrMEw4kL', 'w7rDv8K6KMO2YA==', 'wo/DvHV5', 'Tw9FwogK', 'DiHDoMKjwq3CncOVLhbDhT4=', 'dz5Xwr8=', 'wp90JcKCKMK5w40CwpDDlsOicsKAw7/Dv8K2wpjClVYcw64JckHCvm0=', 'w7AldcOP', 'w6tDPsOEfUs=', 'dFRnwrE=', 'w4xdFsODfQ==', 'KcKRIsOOw50=', 'W1jCjGLDo8K9ScOG', 'XgZHwpQZScKHEi0ZMg==', 'wpDDhMKzMg==', 'wobCn8O8Q1wjw4jDh8OdVVZZwq8Pw4bCucOHw7zCrsOBCcOgw6o=', 'w6lDMcOM', 'woldw5nCusKEEQh2wpVXeQ==', 'eX3Cv8OJ', 'w4nDqgDCtlLDj8K4w4M=', 'eU1kw6paCh8TZMOSJMKKUQHDrWjDv8OSXMO6w6kXSMKpwqDCiWg=', 'wrdZwrPCoMKH', 'w54vUcKSdMO9', 'RHXCq1HDqQ==', 'w4N5K8KZPcKWw4QJ', 'w7ARw7BKZQ==', 'w6pzK8OeZQ==', 'wp3DncKkNcKD', 'IMOlAcKrbg==', 'RsKUMXLCkcK7', 'wqV/BsK8EQ==', 'bHtiwpVr', 'wrJbw4HCk8KE', 'wrXDhX16w7Y=', 'w4I9w70=', 'w6ZdwrXCssKH', 'worDjF1+w5g=', 'PxDDucKCw4c=', 'NRfClxVG', 'wp81w5sfQA==', 'O09rw4bDiw==', 'wrYZw5wVVTwEwr3CnD4g', 'w5p9HMOffA==', 'w5gawpjDoMOC', 'w6oiwrloM8KGwoFqHcKMMA==', 'M8KXG8O+w5s=', 'YXcmw4rDiAXCtH3Dr8OZCcOMOWx3w5vCjXjCnFwKwqlVecO/w5Zu', 'wrvCuAYZwrbCrHF6', 'w5tjwrLCr8KJ', 'wpLDhMK8OsKDw6zCnMKaw4Be', 'wpDCuXDDhnnDqz10', 'YcO0wo41w6w=', 'dToBwolUw5wU', 'TyoswoJh', 'SsO6w6/DnMOz', 'wp7CuiERwq0=', 'fhHCnHTDpsOd', 'JsOZw7kzVcKfA8OYI8OYAcKUw7jClicPwojCnzzDm2nCnMK0D8OIGEbDhsOCLinCmCEuwqzCpsK2wrIbIcOUw7TDrzZaCsOZw6ldw6bCpsKmw5U=', 'w57DuzPCnzHCvmQUW8OHPw==', 'CgbDtMK9w6nDjH/CusOpAcKd', 'wp9+A8OJeMK7MMKyDDTDkg==', 'woB4LMKfD8Kcw4cb', 'wprCtx0Dwog=', 'TcO3w7LDng==', 'e1J6wrFcHQYzbsOSfg==', 'HDUzw6LCtA==', 'J8KoHsOdw4/CmFs=', 'T8O/w6jDmw==', 'w7Aaw4F2fg==', 'CMODTkocw78L', 'w7xPM8ONcVgjwqg=', 'w6UjaMOaw4FUw5U=', 'ZjJVwr47KCPCkA==', 'wq5VbHXDvcOdw7M=', 'dcOsY0AlworCp8KPw6Ftw7paccKtF8KPEcO6wrnDtcK2AMO3w5HCpifCucK9DcKzwrvCjCnDrsKAw5DCp2jCsVVewqXDqjEQfcKdKMKgwpxrM0vCusK0w7LCgmtGc1TDvCBbT28Uwo8lw7l9w7rCjcO4wrlYWlwEayE2UmLDsxEnbWnCuMOXYy5/w6Jcw4E=', 'R8KlD1TClw==', 'w6HCpEgZwq7CpG1nw7jCjWjDlsKbw6XDuDTDhcOXwqIX', 'w4sRw40KPh3DlMKbc8OsQA==', 'w5HCtBk5w4LDrMKdZMKE', 'w7PCrgcUwrbCoGZgw6jDgmvDl8KAwrzCuTTDlcOMw7ZBHXJMVMOFwoo=', 'KCvCijxcwoQ=', 'ZDAJwo9Uw5cIw7XCkMKPw7I=', 'XcKJJ3/CmsKy', 'CcOuwpkew5nCpMOZw4/DrjXCqMKQwpYOw7/CsMKkw4M=', 'wqrCig0zwqE=', 'w5LCsMOmMcOiw78=', 'w71VZ2TCrcK8w7jCosOtTiR9w6nCvcKZwpzChsKOZMKTKCMNLcKSWhc=', 'wo9Kw53CssKVETk=', 'w6rDpwETw43DgcOSZEU/R1/DgMKewrrDoQ==', 'w4vClMO7VlU0w5vCp8OVUk0=', 'wqLDhmN8w5tXND4=', 'w6nDjBfCjFk=', 'RxNTwpgA', 'w6XCscK3wo90', 'wrIIwqXDhG0=', 'w6DCoMK8woVzAA==', 'CA3Dvg==', 'JMOgLVY6', 'LBTDuMK+wp0=', 'wrZ5wpPCisKMwq5Zwo0=', 'wr3DpkFGw7o=', 'FTjCvxZ+eWnDqg==', 'cUlxwqhK', 'w4HCj8OwT0M=', 'w6vCmsOwRGU=', 'WcKFLXzCi8K0', 'JSzDisKBwoU=', 'QAZEwpwbRA==', 'woB4LMKfFcKAw40BwqbClMOwacKc', 'wqzDjGN9w7dbJR7DhjDDtA==', 'w5XCojMlw7jDqMKUaA==', 'wqZzwpHCm8KKwqJCwrLCnTPDkw==', 'KSvCii5hwphdwo/DqsKRw5DCq8OiDT0=', 'w4vDoQrCgVvDlsK/w71bOMKe', 'VT04w7nCiMOxZsKQw7/CnF4dTw==', 'e33CosOMMxfDvgXDsFnDqk/CnMKrKMOf', 'w5tRwpbCgsKFa8OKGndqwpfCiz5j', 'ICfClzpKwoBdw4LDisKRw5DCq8OiDT1R', 'w6TDrQESw6HDjcODZGg4VgA=', 'w6xFMcOcd1Q4wpc5fhU=', 'EcOUSVgyw64cw7LDinA4Q2k=', 'bzYDwp9Uw4E=', 'wrxEBzExW8KDbMKQa8O3', 'cnHCv8OYGA/DvkjDh1jDtlk=', 'wrJOBzAdV8KSTMK2acOjZsOV', 'wqRUZmTDoMOqw6HCisOmVXw=']; (function(_0x520fbc, _0x514208) {
    var _0x41b9e7 = function(_0x2c8cc7) {
        while (--_0x2c8cc7) {
            _0x520fbc['push'](_0x520fbc['shift']());
        }
    };
    _0x41b9e7(++_0x514208);
} (_kod_0x43e2, 0x10d));
var _kod_0x1c17 = function(_0x5a0f63, _0x219c23) {
    _0x5a0f63 = _0x5a0f63 - 0x0;
    var _0x2ef295 = _kod_0x43e2[_0x5a0f63];
    if (_kod_0x1c17['abGsUP'] === undefined) { (function() {
            var _0x397b50 = function() {
                var _0x1e6ad4;
                try {
                    _0x1e6ad4 = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
                } catch(_0xbcacd7) {
                    _0x1e6ad4 = window;
                }
                return _0x1e6ad4;
            };
            var _0x14a62e = _0x397b50();
            var _0x1111c1 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
            _0x14a62e['atob'] || (_0x14a62e['atob'] = function(_0x5eee9e) {
                var _0x4faf84 = String(_0x5eee9e)['replace'](/=+$/, '');
                for (var _0x1f54d1 = 0x0,
                _0x5b1542, _0x54a814, _0x24a069 = 0x0,
                _0x13a48f = ''; _0x54a814 = _0x4faf84['charAt'](_0x24a069++);~_0x54a814 && (_0x5b1542 = _0x1f54d1 % 0x4 ? _0x5b1542 * 0x40 + _0x54a814: _0x54a814, _0x1f54d1++%0x4) ? _0x13a48f += String['fromCharCode'](0xff & _0x5b1542 >> ( - 0x2 * _0x1f54d1 & 0x6)) : 0x0) {
                    _0x54a814 = _0x1111c1['indexOf'](_0x54a814);
                }
                return _0x13a48f;
            });
        } ());
        var _0x303545 = function(_0x2f0a45, _0x5bfb12) {
            var _0x424552 = [],
            _0x371810 = 0x0,
            _0x237101,
            _0x523b60 = '',
            _0x3fbf4d = '';
            _0x2f0a45 = atob(_0x2f0a45);
            for (var _0x440130 = 0x0,
            _0x493aaf = _0x2f0a45['length']; _0x440130 < _0x493aaf; _0x440130++) {
                _0x3fbf4d += '%' + ('00' + _0x2f0a45['charCodeAt'](_0x440130)['toString'](0x10))['slice']( - 0x2);
            }
            _0x2f0a45 = decodeURIComponent(_0x3fbf4d);
            for (var _0x40192b = 0x0; _0x40192b < 0x100; _0x40192b++) {
                _0x424552[_0x40192b] = _0x40192b;
            }
            for (_0x40192b = 0x0; _0x40192b < 0x100; _0x40192b++) {
                _0x371810 = (_0x371810 + _0x424552[_0x40192b] + _0x5bfb12['charCodeAt'](_0x40192b % _0x5bfb12['length'])) % 0x100;
                _0x237101 = _0x424552[_0x40192b];
                _0x424552[_0x40192b] = _0x424552[_0x371810];
                _0x424552[_0x371810] = _0x237101;
            }
            _0x40192b = 0x0;
            _0x371810 = 0x0;
            for (var _0x3adca4 = 0x0; _0x3adca4 < _0x2f0a45['length']; _0x3adca4++) {
                _0x40192b = (_0x40192b + 0x1) % 0x100;
                _0x371810 = (_0x371810 + _0x424552[_0x40192b]) % 0x100;
                _0x237101 = _0x424552[_0x40192b];
                _0x424552[_0x40192b] = _0x424552[_0x371810];
                _0x424552[_0x371810] = _0x237101;
                _0x523b60 += String['fromCharCode'](_0x2f0a45['charCodeAt'](_0x3adca4) ^ _0x424552[(_0x424552[_0x40192b] + _0x424552[_0x371810]) % 0x100]);
            }
            return _0x523b60;
        };
        _kod_0x1c17['aKBbDV'] = _0x303545;
        _kod_0x1c17['diFVlA'] = {};
        _kod_0x1c17['abGsUP'] = !![];
    }
    var _0x3f8ad7 = _kod_0x1c17['diFVlA'][_0x5a0f63];
    if (_0x3f8ad7 === undefined) {
        if (_kod_0x1c17['yJbWLb'] === undefined) {
            _kod_0x1c17['yJbWLb'] = !![];
        }
        _0x2ef295 = _kod_0x1c17['aKBbDV'](_0x2ef295, _0x219c23);
        _kod_0x1c17['diFVlA'][_0x5a0f63] = _0x2ef295;
    } else {
        _0x2ef295 = _0x3f8ad7;
    }
    return _0x2ef295;
};
define(_kod_0x1c17('0x0', ']2ac'), [],
function(_0x1eb62e, _0x127573) {
    var _0x30345e = {};
    _0x30345e[_kod_0x1c17('0x1', 'yfxJ')] = function(_0x56845c, _0x3c005e) {
        return _0x56845c + _0x3c005e;
    };
    _0x30345e['ScRkE'] = _kod_0x1c17('0x2', 'a8gD');
    _0x30345e['sMFkP'] = 'TVOVR';
    _0x30345e['eKlTX'] = function(_0x5c3f29, _0x34de6a) {
        return _0x5c3f29 && _0x34de6a;
    };
    _0x30345e[_kod_0x1c17('0x3', 'V45V')] = _kod_0x1c17('0x4', 'JX9h');
    _0x30345e[_kod_0x1c17('0x5', '3%Aj')] = ':visible';
    _0x30345e['ABsyg'] = function(_0x12d24e, _0x4d533d) {
        return _0x12d24e !== _0x4d533d;
    };
    _0x30345e[_kod_0x1c17('0x6', '9#0*')] = _kod_0x1c17('0x7', 'pXx7');
    _0x30345e['AZviU'] = function(_0x17e0ea, _0x2fb011) {
        return _0x17e0ea == _0x2fb011;
    };
    _0x30345e[_kod_0x1c17('0x8', '!Ss*')] = _kod_0x1c17('0x9', 'RapS');
    _0x30345e[_kod_0x1c17('0xa', 'JX9h')] = function(_0xe1c3a4, _0x53d38f) {
        return _0xe1c3a4 != _0x53d38f;
    };
    _0x30345e[_kod_0x1c17('0xb', ']2ac')] = function(_0x49d85d, _0x323901) {
        return _0x49d85d + _0x323901;
    };
    _0x30345e[_kod_0x1c17('0xc', 'u$27')] = function(_0x9a7d8b, _0x478731) {
        return _0x9a7d8b(_0x478731);
    };
    _0x30345e[_kod_0x1c17('0xd', 'W!^z')] = _kod_0x1c17('0xe', ']%0g');
    _0x30345e[_kod_0x1c17('0xf', 'cB1!')] = function(_0x397cc9, _0x4f9335, _0x5d34fc, _0x467722) {
        return _0x397cc9(_0x4f9335, _0x5d34fc, _0x467722);
    };
    _0x30345e[_kod_0x1c17('0x10', 'W!^z')] = function(_0x38dfbe, _0x3142bb, _0x3bd0a5, _0x2f6fe0, _0x16e4ab) {
        return _0x38dfbe(_0x3142bb, _0x3bd0a5, _0x2f6fe0, _0x16e4ab);
    };
    _0x30345e[_kod_0x1c17('0x11', 'eudT')] = 'UkIMv';
    _0x30345e[_kod_0x1c17('0x12', 'D*jI')] = _kod_0x1c17('0x13', 'MR2y');
    _0x30345e[_kod_0x1c17('0x14', 'Nl51')] = _kod_0x1c17('0x15', 'MR2y');
    _0x30345e['mkPmI'] = 'dialog-min';
    _0x30345e[_kod_0x1c17('0x16', '9#0*')] = '</span>)';
    _0x30345e[_kod_0x1c17('0x17', ']%0g')] = '-first-item';
    _0x30345e['GFuij'] = _kod_0x1c17('0x18', '4uJC');
    _0x30345e[_kod_0x1c17('0x19', 'v%84')] = function(_0x45d800, _0x1f1ce7) {
        return _0x45d800(_0x1f1ce7);
    };
    _0x30345e['okPsF'] = _kod_0x1c17('0x1a', 'Nl51');
    _0x30345e['RAkgn'] = _kod_0x1c17('0x1b', '!r$W');
    _0x30345e[_kod_0x1c17('0x1c', 'cB1!')] = '$.contextMenu\x20is\x20not\x20function!';
    _0x30345e['dqLMM'] = _kod_0x1c17('0x1d', 'pXx7');
    _0x30345e['yzXMV'] = _kod_0x1c17('0x1e', 'Xvs@');
    _0x30345e[_kod_0x1c17('0x1f', 'ZT7D')] = _kod_0x1c17('0x20', '(Aif');
    _0x30345e[_kod_0x1c17('0x21', '(Aif')] = _kod_0x1c17('0x22', ']s5X');
    _0x30345e[_kod_0x1c17('0x23', '!r$W')] = _kod_0x1c17('0x24', 'GV$8');
    _0x30345e['jPOrp'] = _kod_0x1c17('0x25', 'lqYJ');
    $[_kod_0x1c17('0x26', 'Xvs@')] || ($[_kod_0x1c17('0x27', 'eudT')] = {}),
    $['contextMenu']['show'] = function(_0x3ca276, _0x4a227d, _0xd6527) {
        _0x3ca276 && ($[_kod_0x1c17('0x28', 'a8gD')]['hidden'](), $(_0x3ca276)['contextMenu']({
            'x': _0x4a227d,
            'y': _0xd6527
        }));
    },
    $['contextMenu'][_kod_0x1c17('0x29', 'JX9h')] = function() {
        if (_kod_0x1c17('0x2a', '!r$W') !== _0x30345e['sMFkP']) {
            var _0x1eb62e = $('.context-menu-active'),
            _0x127573 = _0x1eb62e[_kod_0x1c17('0x2b', ']s5X')](_kod_0x1c17('0x2c', ']2ac'));
            if (_0x30345e['eKlTX'](_0x1eb62e, _0x127573)) {
                var _0x301156 = _0x127573[_kod_0x1c17('0x2d', 'MzDl')],
                _0x2513ef = _kod_0x1c17('0x2e', 'v%84');
                _0x301156[_kod_0x1c17('0x2f', ']s5X')](_0x30345e[_kod_0x1c17('0x30', '3%Aj')])['addClass'](_0x2513ef),
                Hook[_kod_0x1c17('0x31', '6!)d')]('rightMenu.show', _0x127573[_kod_0x1c17('0x32', '9#0*')], _0x1eb62e, _0x301156),
                Hook[_kod_0x1c17('0x33', '4o4j')]('rightMenu.show' + _0x127573[_kod_0x1c17('0x34', '8YZl')], _0x1eb62e, _0x301156);
            }
        } else {
            return _0x1eb62e ? -0x1 !== _0x1eb62e[_kod_0x1c17('0x35', 'Voly')]('/') ? _0x30345e['rELOh'](_kod_0x1c17('0x36', 'W1Ei'), _0x1eb62e) + _0x30345e['ScRkE'] : _0x30345e[_kod_0x1c17('0x37', 'RapS')](_kod_0x1c17('0x38', '!r$W') + _0x1eb62e, _0x30345e['ScRkE']) : '';
        }
    },
    $[_kod_0x1c17('0x39', 'N3N&')][_kod_0x1c17('0x3a', ']@Dk')] = function() {
        return 0x0 == $(_kod_0x1c17('0x3b', '!r$W'))[_kod_0x1c17('0x3c', 'D*jI')] ? !0x1: !0x0;
    },
    $[_kod_0x1c17('0x3d', '(Aif')][_kod_0x1c17('0x3e', 'RapS')] = function() {
        $(_kod_0x1c17('0x3f', 'ZT7D'))['filter'](_0x30345e[_kod_0x1c17('0x40', '!r$W')])[_kod_0x1c17('0x41', 'pvcY')](_kod_0x1c17('0x42', 'Voly'))[_kod_0x1c17('0x43', 'u$27')](_kod_0x1c17('0x44', '7dBm'));
    },
    $[_kod_0x1c17('0x45', '6SFe')][_kod_0x1c17('0x46', 'W!^z')] = function(_0x1280ca, _0x1c2322) {
        if (_0x30345e[_kod_0x1c17('0x47', '5hav')](_0x30345e['eYtvw'], _kod_0x1c17('0x48', 'KUyF'))) {
            var _0x503e74 = _0x3983b2[_kod_0x1c17('0x49', 'IRQA')][_0x1c2322[_0x139933]] && _0x3983b2[_kod_0x1c17('0x4a', 'gdK)')][_0x1c2322[_0x139933]]['$node'];
            _0x503e74 && 0x0 != _0x503e74[_kod_0x1c17('0x4b', 'IRQA')] && (_0x2f1e15 = _0x2f1e15 ? _0x2f1e15[_kod_0x1c17('0x4c', 'eudT')](_0x503e74) : _0x503e74);
        } else {
            var _0x3983b2, _0x241691 = $[_kod_0x1c17('0x3d', '(Aif')][_kod_0x1c17('0x4d', 'W1Ei')];
            for (var _0xb5ae4a in _0x241691) if (_0x30345e['AZviU'](_0x241691[_0xb5ae4a]['selector'], _0x1280ca) || _0x30345e[_kod_0x1c17('0x4e', '@sw&')](_0x241691[_0xb5ae4a][_kod_0x1c17('0x4f', 'yfxJ')], _0x30345e[_kod_0x1c17('0x50', 'W!^z')]('.', _0x1280ca)) || _0x241691[_0xb5ae4a]['selector'] == '#' + _0x1280ca) {
                _0x1280ca = _0x241691[_0xb5ae4a][_kod_0x1c17('0x51', 'Af%U')],
                _0x3983b2 = _0x241691[_0xb5ae4a];
                break;
            }
            if (void 0x0 === _0x1c2322) return _0x3983b2[_kod_0x1c17('0x52', ']2ac')];
            if (!_0x3983b2 || !_0x3983b2[_kod_0x1c17('0x53', '6SFe')]) return ! 0x1;
            _0x30345e[_kod_0x1c17('0x54', '6SFe')] == typeof _0x1c2322 && (_0x1c2322 = [_0x1c2322]);
            for (var _0x2f1e15 = !0x1,
            _0x139933 = 0x0; _0x139933 < _0x1c2322[_kod_0x1c17('0x55', 'RapS')]; _0x139933++) {
                var _0x4fed76 = _0x3983b2[_kod_0x1c17('0x4a', 'gdK)')][_0x1c2322[_0x139933]] && _0x3983b2['items'][_0x1c2322[_0x139933]]['$node'];
                _0x4fed76 && _0x30345e[_kod_0x1c17('0x56', '@sw&')](0x0, _0x4fed76[_kod_0x1c17('0x57', 'KUyF')]) && (_0x2f1e15 = _0x2f1e15 ? _0x2f1e15['add'](_0x4fed76) : _0x4fed76);
            }
            return _0x2f1e15;
        }
    },
    $['contextMenu'][_kod_0x1c17('0x58', 'JX9h')] = function(_0x7697f5, _0x2ceee7, _0x348a1a, _0x5c6308) {
        var _0x56cbdd = $[_kod_0x1c17('0x59', 'W!^z')][_kod_0x1c17('0x5a', ']@Dk')](_0x7697f5, _0x2ceee7);
        _0x56cbdd && (_0x5c6308 ? _0x56cbdd['addClass'](_0x348a1a) : _0x56cbdd['removeClass'](_0x348a1a));
    },
    $[_kod_0x1c17('0x5b', 'yfxJ')][_kod_0x1c17('0x5c', 'D*jI')] = function(_0x74b15d, _0x5901ba) {
        $[_kod_0x1c17('0x5d', '5hav')][_kod_0x1c17('0x5e', 'MzDl')](_0x74b15d, _0x5901ba, _kod_0x1c17('0x5f', 'Ux%V'), !0x0);
    },
    $['contextMenu'][_kod_0x1c17('0x60', 'cB1!')] = function(_0x4c033e, _0x92b2c8) {
        $[_kod_0x1c17('0x26', 'Xvs@')]['menuItemClass'](_0x4c033e, _0x92b2c8, _kod_0x1c17('0x61', 'D*jI'), !0x1);
    },
    $['contextMenu'][_kod_0x1c17('0x62', '7dBm')] = function(_0x348e56, _0x51be55) {
        $[_kod_0x1c17('0x63', '9#0*')][_kod_0x1c17('0x64', '6!)d')](_0x348e56, _0x51be55, _kod_0x1c17('0x65', '(Aif'), !0x0);
    },
    $[_kod_0x1c17('0x66', '!^I3')][_kod_0x1c17('0x67', 'Ux%V')] = function(_0x382169, _0x354c1a) {
        $['contextMenu'][_kod_0x1c17('0x68', '!^I3')](_0x382169, _0x354c1a, 'hidden', !0x1);
    },
    $[_kod_0x1c17('0x66', '!^I3')]['menuItemRemove'] = function(_0x465b44, _0x4ef4b6) {
        var _0x384fc4 = $[_kod_0x1c17('0x69', 'Voly')][_kod_0x1c17('0x6a', '4o4j')](_0x465b44, _0x4ef4b6);
        _0x384fc4 && _0x384fc4[_kod_0x1c17('0x6b', 'oZSO')]();
    },
    $[_kod_0x1c17('0x6c', '8YZl')]['menuAdd'] = function(_0x46b9a1, _0x1c77e5, _0x5523e5, _0x45eab9) {
        var _0x20f8de = {};
        _0x20f8de[_kod_0x1c17('0x6d', 'Ux%V')] = _kod_0x1c17('0x6e', '3%Aj');
        _0x20f8de[_kod_0x1c17('0x6f', '9#0*')] = function(_0x316ec8, _0x1a3f0e) {
            return _0x30345e.tFvPR(_0x316ec8, _0x1a3f0e);
        };
        _0x20f8de[_kod_0x1c17('0x70', 'Xvs@')] = function(_0x5c890a, _0x287ae4) {
            return _0x5c890a !== _0x287ae4;
        };
        _0x20f8de[_kod_0x1c17('0x71', 'u$27')] = function(_0x1eb4e1, _0x2bc033) {
            return _0x30345e.IcuFv(_0x1eb4e1, _0x2bc033);
        };
        _0x20f8de[_kod_0x1c17('0x72', 'eudT')] = function(_0x550ba6, _0x5dba68) {
            return _0x30345e.tFvPR(_0x550ba6, _0x5dba68);
        };
        _0x20f8de[_kod_0x1c17('0x73', 'gdK)')] = _kod_0x1c17('0x74', 'Voly');
        _0x20f8de[_kod_0x1c17('0x75', '7dBm')] = _0x30345e.zfpsd;
        _0x20f8de[_kod_0x1c17('0x76', '4o4j')] = function(_0xc462fb, _0x257270, _0x5c40e3, _0x4b320d) {
            return _0x30345e.PiMEK(_0xc462fb, _0x257270, _0x5c40e3, _0x4b320d);
        };
        var _0x232f9a = !0x1,
        _0x554163 = $[_kod_0x1c17('0x77', 'gdK)')][_kod_0x1c17('0x78', 'W!^z')];
        for (var _0x84c07 in _0x554163) if (_0x554163[_0x84c07][_kod_0x1c17('0x79', '!r$W')] == _0x1c77e5) {
            _0x232f9a = _0x554163[_0x84c07];
            break;
        }
        if (_0x232f9a && _0x46b9a1) {
            var _0x39ad03 = function(_0x5ccf0e) {
                return _0x5ccf0e ? -0x1 !== _0x5ccf0e[_kod_0x1c17('0x7a', 'Af%U')]('/') ? _0x20f8de[_kod_0x1c17('0x7b', 'oVyk')] + _0x5ccf0e + _kod_0x1c17('0x7c', 'pXx7') : _0x20f8de['FgZLr'](_kod_0x1c17('0x7d', 'IRQA') + _0x5ccf0e, _kod_0x1c17('0x7e', 'W!^z')) : '';
            },
            _0xcc6def = function(_0x1419bd, _0x2a0f93, _0x463d02, _0x13c536) {
                var _0xe40f93 = {};
                _0xe40f93[_kod_0x1c17('0x7f', 'pXx7')] = function(_0x529487, _0x44c5f4) {
                    return _0x529487(_0x44c5f4);
                };
                _0xe40f93[_kod_0x1c17('0x80', 'lqYJ')] = function(_0x542b02, _0x561bf8) {
                    return _0x542b02 + _0x561bf8;
                };
                _0xe40f93[_kod_0x1c17('0x81', 'Voly')] = function(_0x53d1f8, _0x48d8a1) {
                    return _0x53d1f8 + _0x48d8a1;
                };
                _0xe40f93[_kod_0x1c17('0x82', '4o4j')] = 'string';
                _0xe40f93['puoua'] = function(_0x46723b, _0x2dcd54) {
                    return _0x46723b + _0x2dcd54;
                };
                _0xe40f93[_kod_0x1c17('0x83', 'MR2y')] = function(_0x587136, _0x22a8e5) {
                    return _0x20f8de.WAhqj(_0x587136, _0x22a8e5);
                };
                _0xe40f93[_kod_0x1c17('0x84', 'D*jI')] = function(_0xb84300, _0x54d880) {
                    return _0xb84300 + _0x54d880;
                };
                _0xe40f93[_kod_0x1c17('0x85', 'Voly')] = function(_0x47b115, _0x308768) {
                    return _0x47b115 + _0x308768;
                };
                _0xe40f93[_kod_0x1c17('0x86', 'lqYJ')] = '<li\x20class=\x22context-menu-item\x20';
                _0xe40f93['sdbCy'] = function(_0x13245a, _0x1d2a2d) {
                    return _0x20f8de.zdEtZ(_0x13245a, _0x1d2a2d);
                };
                _0xe40f93[_kod_0x1c17('0x87', 'oVyk')] = _kod_0x1c17('0x88', '!Ss*');
                _0xe40f93['wtNfd'] = function(_0x4ff571, _0x4103c4) {
                    return _0x4ff571 == _0x4103c4;
                };
                _0xe40f93['DjuSx'] = _kod_0x1c17('0x89', 'a8gD');
                _0xe40f93['gPilF'] = function(_0x2cbe83, _0x2c0c0d) {
                    return _0x2cbe83 != _0x2c0c0d;
                };
                _0xe40f93[_kod_0x1c17('0x8a', 'ZT7D')] = function(_0x2a92ca, _0x109bed) {
                    return _0x20f8de.MbGCJ(_0x2a92ca, _0x109bed);
                };
                _0xe40f93[_kod_0x1c17('0x8b', 'KUyF')] = '<ul\x20class=\x22context-menu-list\x20';
                _0xe40f93[_kod_0x1c17('0x8c', 'yfxJ')] = _0x20f8de.OMZkp;
                _0xe40f93[_kod_0x1c17('0x8d', 'a8gD')] = _0x20f8de.Tupdv;
                _0xe40f93['htDiv'] = function(_0x1ae9ae, _0x3d90a2) {
                    return _0x1ae9ae + _0x3d90a2;
                };
                _0xe40f93['YOeyF'] = function(_0x4d8b06, _0x54eebb, _0x4a4e68, _0x1a887d) {
                    return _0x20f8de.QDdZH(_0x4d8b06, _0x54eebb, _0x4a4e68, _0x1a887d);
                };
                var _0x554163 = [],
                _0x84c07 = {};
                if (_0x463d02) {
                    for (var _0x392818 in _0x2a0f93) _0x554163[_kod_0x1c17('0x8e', '4uJC')]({
                        'key': _0x392818,
                        'value': _0x2a0f93[_0x392818]
                    });
                    for (var _0x21e2f5 = _0x554163[_kod_0x1c17('0x8f', 'W1Ei')] - 0x1; _0x21e2f5 >= 0x0; _0x21e2f5--) _0x84c07[_0x554163[_0x21e2f5]['key']] = _0x554163[_0x21e2f5][_kod_0x1c17('0x90', '(Aif')];
                } else _0x84c07 = _0x2a0f93;
                $[_kod_0x1c17('0x91', ']%0g')](_0x84c07,
                function(_0x1d850d, _0x1adbb3) {
                    _0x1adbb3[_kod_0x1c17('0x92', 'D*jI')] = _0x1adbb3[_kod_0x1c17('0x93', 'MzDl')] || '';
                    var _0x84c07 = _0xe40f93[_kod_0x1c17('0x94', ']%0g')](_0xe40f93[_kod_0x1c17('0x95', 'RapS')](_0x1d850d, '\x20'), _0x1adbb3[_kod_0x1c17('0x96', 'u$27')]);
                    if (_0xe40f93[_kod_0x1c17('0x97', 'JX9h')] == typeof _0x1adbb3) var _0x392818 = _0xe40f93['puoua'](_kod_0x1c17('0x98', '7dBm') + _0x84c07, _kod_0x1c17('0x99', '8YZl'));
                    else {
                        if (_0xe40f93[_kod_0x1c17('0x9a', '9#0*')](_kod_0x1c17('0x9b', '5hav'), _kod_0x1c17('0x9c', '(Aif'))) {
                            var _0x21e2f5 = _0x1adbb3[_kod_0x1c17('0x9d', ']2ac')];
                            _0x1adbb3[_kod_0x1c17('0x9e', 'MzDl')] && (_0x21e2f5 += _kod_0x1c17('0x9f', ']%0g') + _0x1adbb3[_kod_0x1c17('0xa0', 'JX9h')] + '</span>)');
                            var _0x392818 = _0xe40f93[_kod_0x1c17('0xa1', 'Xvs@')](_0xe40f93['hzhyM'](_0xe40f93['fAObF'] + _0x84c07 + '\x22>', _0xe40f93['sdbCy'](_0x39ad03, _0x1adbb3['icon'])) + _0xe40f93[_kod_0x1c17('0xa2', ']%0g')], _0x21e2f5) + _kod_0x1c17('0xa3', 'N3N&');
                        } else {
                            var _0x54722e = _0xe40f93[_kod_0x1c17('0xa4', '4uJC')]($, this)['parent']()[_kod_0x1c17('0xa5', 'D*jI')]()[_kod_0x1c17('0xa6', ']2ac')]('id'),
                            _0x2ca0f0 = $[_kod_0x1c17('0xa7', 'N3N&')]['list'][_0x54722e];
                            _0x2ca0f0[_kod_0x1c17('0xa8', '6SFe')](),
                            $[_kod_0x1c17('0xa9', 'Af%U')][_kod_0x1c17('0xaa', 'Ux%V')]();
                        }
                    }
                    var _0x4c3fec = $(_0x392818)['clone'](),
                    _0x569028 = _0x463d02 || _0x13c536,
                    _0x43b93c = _0x1419bd['$menu'][_kod_0x1c17('0xab', 'LE8V')](_0x569028)[_kod_0x1c17('0xac', 'gdK)')]();
                    _0xe40f93['wtNfd'](0x0, _0x43b93c['length']) && _0x1419bd[_kod_0x1c17('0xad', 'u$27')][_0x569028] && (_0x43b93c = _0x1419bd[_kod_0x1c17('0xae', 'a8gD')][_0x569028][_kod_0x1c17('0xaf', 'D*jI')]),
                    0x0 == _0x43b93c['length'] && (_0x43b93c = _0x1419bd[_kod_0x1c17('0xb0', 'GV$8')][_kod_0x1c17('0xb1', 'Voly')]()[_kod_0x1c17('0xb2', 'oZSO')]()),
                    _0x463d02 ? _0x43b93c[_kod_0x1c17('0xb3', '!r$W')](_0x4c3fec) : _0x13c536 && _0x43b93c[_kod_0x1c17('0xb4', 'N3N&')](_0x4c3fec);
                    var _0x5e027e = _0x4c3fec[_kod_0x1c17('0xb5', ']@Dk')](_0xe40f93[_kod_0x1c17('0xb6', 'u$27')])[_kod_0x1c17('0xb7', '@sw&')](_kod_0x1c17('0xb8', 'KUyF'));
                    _0x4c3fec['data']({
                        'contextMenu': _0x5e027e,
                        'contextMenuKey': _0x1d850d,
                        'contextMenuRoot': _0x232f9a
                    });
                    var _0x70f2b = {};
                    _0x70f2b[_kod_0x1c17('0xb9', 'v%84')] = null;
                    _0x70f2b[_kod_0x1c17('0xba', 'JX9h')] = null;
                    _0x70f2b['accesskey'] = _0x1adbb3.accesskey;
                    _0x70f2b[_kod_0x1c17('0xbb', 'lqYJ')] = _0x1adbb3.className;
                    _0x70f2b[_kod_0x1c17('0xbc', 'MzDl')] = _0x1adbb3.icon;
                    _0x70f2b[_kod_0x1c17('0xbd', '7dBm')] = _0x1adbb3.name;
                    _0x70f2b['_name'] = _0x21e2f5;
                    _0x70f2b[_kod_0x1c17('0xbe', '4o4j')] = _0x4c3fec;
                    if (_0x5e027e && (_0x5e027e[_kod_0x1c17('0xbf', 'lqYJ')] || (_0x5e027e[_kod_0x1c17('0xc0', '3%Aj')] = {}), _0x5e027e['items'][_0x1d850d] = _0x70f2b), _0xe40f93[_kod_0x1c17('0xc1', 'LE8V')](_0xe40f93['DhFjD'], typeof _0x1adbb3) && (_0x1419bd[_kod_0x1c17('0xc2', 'JX9h')] || (_0x1419bd[_kod_0x1c17('0xc3', 'cB1!')] = {}), _0x1419bd[_kod_0x1c17('0xae', 'a8gD')][_0x1d850d] = _0x70f2b, _0x232f9a[_kod_0x1c17('0xc4', '5hav')][_0x1d850d] = _0x70f2b, _0x232f9a[_kod_0x1c17('0xc5', '4o4j')][_0x1d850d] = function(_0x5c5613, _0xf11d37) {
                        _0x1adbb3[_kod_0x1c17('0xc6', '5hav')](_0x5c5613, _0xf11d37);
                    },
                    _0x1adbb3[_kod_0x1c17('0xc7', '!Ss*')] && (_0x232f9a[_kod_0x1c17('0xc8', 'yfxJ')][_0x1adbb3['accesskey']] = _0x70f2b), _0x1adbb3[_kod_0x1c17('0xc9', 'Xvs@')])) {
                        var _0x53e547 = _0x1d850d + _kod_0x1c17('0xca', 'KUyF'),
                        _0x392818 = _0xe40f93['hzhyM'](_0xe40f93['hzhyM'](_0xe40f93[_kod_0x1c17('0xcb', 'MzDl')](_0xe40f93[_kod_0x1c17('0xcc', 'yfxJ')] + _0x1d850d, _kod_0x1c17('0xcd', 'D*jI')), _0x53e547), _0xe40f93[_kod_0x1c17('0x8c', 'yfxJ')]);
                        $(_0x392818)['appendTo'](_0x4c3fec),
                        _0x70f2b[_kod_0x1c17('0xce', 'eudT')] = _0x4c3fec['find'](_0xe40f93['hJzvf'] + _0x1d850d),
                        _0x70f2b['callback'] = null,
                        _0x70f2b[_kod_0x1c17('0xcf', 'cB1!')] = _0x70f2b[_kod_0x1c17('0xd0', 'yfxJ')],
                        _0x70f2b[_kod_0x1c17('0xd1', 'u$27')] = 'sub',
                        _0x4c3fec['data'](_kod_0x1c17('0xd2', 'pvcY'), _0x70f2b)[_kod_0x1c17('0xd3', 'Xvs@')]('context-menu-submenu'),
                        _0x4c3fec['find'](_0xe40f93[_kod_0x1c17('0xd4', 'lqYJ')]('ul.', _0x1d850d))[_kod_0x1c17('0xd5', '7dBm')]({
                            'contextMenuRoot': _0x232f9a,
                            'contextMenu': _0x70f2b
                        }),
                        _0x4c3fec['find'](_kod_0x1c17('0xd6', 'u$27') + _0x53e547)['data']({
                            'contextMenuRoot': _0x232f9a,
                            'contextMenuKey': _0x53e547,
                            'contextMenu': _0x70f2b
                        }),
                        _0x70f2b[_kod_0x1c17('0xd7', 'V45V')] || (_0x70f2b[_kod_0x1c17('0xd8', '!Ss*')] = {}),
                        _0x70f2b[_kod_0x1c17('0xd9', 'u$27')][_0x53e547] = {
                            '$input': null,
                            '$label': null,
                            'icon': '',
                            'name': '',
                            '_name': '',
                            '$node': _0x4c3fec[_kod_0x1c17('0xda', '8YZl')](_0xe40f93[_kod_0x1c17('0xdb', 'Nl51')](_kod_0x1c17('0xdc', 'oVyk'), _0x53e547))
                        },
                        _0xe40f93[_kod_0x1c17('0xdd', 'KUyF')](_0xcc6def, _0x70f2b, _0x1adbb3[_kod_0x1c17('0xde', 'cB1!')], '.' + _0x53e547);
                    }
                });
            };
            _0x30345e['EoPwJ'](_0xcc6def, _0x232f9a, _0x46b9a1, _0x5523e5, _0x45eab9);
        }
    };
    var _0x326919 = function() {
        var _0x7a7d1f = {};
        _0x7a7d1f[_kod_0x1c17('0xdf', '6!)d')] = _0x30345e.fQmoo;
        _0x7a7d1f[_kod_0x1c17('0xe0', 'Ux%V')] = _0x30345e.mkPmI;
        _0x7a7d1f[_kod_0x1c17('0xe1', 'gdK)')] = 'dialog-max';
        _0x7a7d1f[_kod_0x1c17('0xe2', 'yfxJ')] = 'qrcode';
        _0x7a7d1f[_kod_0x1c17('0xe3', 'V45V')] = _kod_0x1c17('0xe4', 'pXx7');
        _0x7a7d1f[_kod_0x1c17('0xe5', 'pXx7')] = _kod_0x1c17('0xe6', '9#0*');
        _0x7a7d1f[_kod_0x1c17('0xe7', '4o4j')] = function(_0x23150e, _0x40ba9a) {
            return _0x23150e == _0x40ba9a;
        };
        _0x7a7d1f['cXyQK'] = function(_0x168757, _0x595c61) {
            return _0x168757 + _0x595c61;
        };
        _0x7a7d1f['cnVed'] = _0x30345e.UWCwn;
        _0x7a7d1f['aHEoa'] = function(_0x208f6e, _0x15bb0d) {
            return _0x208f6e + _0x15bb0d;
        };
        _0x7a7d1f[_kod_0x1c17('0xe8', 'LE8V')] = function(_0x4e36d0, _0x4e9638) {
            return _0x30345e.tFvPR(_0x4e36d0, _0x4e9638);
        };
        _0x7a7d1f[_kod_0x1c17('0xe9', 'JX9h')] = function(_0xc58e40, _0x49f044) {
            return _0xc58e40 + _0x49f044;
        };
        _0x7a7d1f[_kod_0x1c17('0xea', 'W!^z')] = function(_0x4d49b2, _0x439ba4) {
            return _0x4d49b2 != _0x439ba4;
        };
        _0x7a7d1f[_kod_0x1c17('0xeb', 'b7gp')] = _0x30345e.oKKCQ;
        _0x7a7d1f[_kod_0x1c17('0xec', '8YZl')] = function(_0x39563b, _0x8651e) {
            return _0x39563b(_0x8651e);
        };
        _0x7a7d1f['QHYSP'] = _kod_0x1c17('0xed', 'a8gD');
        _0x7a7d1f['gDQaF'] = _kod_0x1c17('0xee', '(Aif');
        _0x7a7d1f['cIVWe'] = function(_0x396834, _0x1360ad) {
            return _0x396834 + _0x1360ad;
        };
        _0x7a7d1f[_kod_0x1c17('0xef', 'V45V')] = function(_0x2de326, _0x2f7b54) {
            return _0x2de326 + _0x2f7b54;
        };
        _0x7a7d1f['MISCm'] = _0x30345e.GFuij;
        _0x7a7d1f[_kod_0x1c17('0xf0', 'lqYJ')] = function(_0x6aad0e, _0x41b8f6) {
            return _0x6aad0e == _0x41b8f6;
        };
        return _0x30345e[_kod_0x1c17('0xf1', 'u$27')]($, _0x30345e[_kod_0x1c17('0xf2', 'Xvs@')])[_kod_0x1c17('0xf3', 'N3N&')]('#rightMenu'),
        _0x30345e[_kod_0x1c17('0xf4', '!Ss*')] != typeof $[_kod_0x1c17('0xf5', 'Nl51')] ? console[_kod_0x1c17('0xf6', '(Aif')](_0x30345e[_kod_0x1c17('0xf7', '3%Aj')]) : ($['contextMenu']({
            'zIndex': 0x270f,
            'selector': '.dialog-menu',
            'items': {
                'dialog-quit': {
                    'name': LNG[_kod_0x1c17('0xf8', 'W!^z')],
                    'className': _kod_0x1c17('0xf9', 'RapS'),
                    'icon': _kod_0x1c17('0xfa', 'pXx7'),
                    'accesskey': 'q'
                },
                'dialog-max': {
                    'name': LNG[_kod_0x1c17('0xfb', 'pvcY')],
                    'className': _0x30345e[_kod_0x1c17('0xfc', 'LE8V')],
                    'icon': _kod_0x1c17('0xfd', '6SFe'),
                    'accesskey': 'a'
                },
                'dialog-min': {
                    'name': LNG['dialog_min'],
                    'className': _0x30345e[_kod_0x1c17('0xfe', 'ZT7D')],
                    'icon': _kod_0x1c17('0xff', 'eudT'),
                    'accesskey': 'i'
                },
                'sep1': _0x30345e[_kod_0x1c17('0x100', '8YZl')],
                'refresh': {
                    'name': LNG[_kod_0x1c17('0x101', 'lqYJ')],
                    'className': _0x30345e[_kod_0x1c17('0x102', ']%0g')],
                    'icon': _0x30345e[_kod_0x1c17('0x103', 'Xvs@')],
                    'accesskey': 'r'
                },
                'open-window': {
                    'name': LNG[_kod_0x1c17('0x104', '4o4j')],
                    'className': 'open-window',
                    'icon': _kod_0x1c17('0x105', '!^I3'),
                    'accesskey': 'b'
                },
                'qrcode': {
                    'name': LNG[_kod_0x1c17('0x106', 'W!^z')],
                    'className': _kod_0x1c17('0x107', 'GV$8'),
                    'icon': _kod_0x1c17('0x108', '7dBm'),
                    'accesskey': 'c'
                }
            },
            'callback': function(_0x40c5d0, _0x37e7ff) {
                var _0x326919 = _0x37e7ff[_kod_0x1c17('0x109', 'RapS')]['attr']('id'),
                _0x4251a3 = $['dialog'][_kod_0x1c17('0x10a', 'Nl51')][_0x326919];
                switch (_0x40c5d0) {
                case _0x7a7d1f[_kod_0x1c17('0x10b', 'Ux%V')] : _0x4251a3['close']();
                    break;
                case _0x7a7d1f['dYbPY']:
                    _0x4251a3[_kod_0x1c17('0x10c', 'a8gD')](!0x1);
                    break;
                case _0x7a7d1f['OBbjM']:
                    _0x4251a3['_clickMax']();
                    break;
                case _kod_0x1c17('0x10d', 'JX9h') : _0x4251a3[_kod_0x1c17('0x10e', ']@Dk')]();
                    break;
                case 'open-window':
                    _0x4251a3[_kod_0x1c17('0x10f', 'RapS')]();
                    break;
                case _0x7a7d1f[_kod_0x1c17('0x110', '6!)d')] : core[_kod_0x1c17('0x111', '8YZl')](_0x4251a3['DOM'][_kod_0x1c17('0x112', 'ZT7D')][_kod_0x1c17('0x113', '!^I3')](_0x7a7d1f[_kod_0x1c17('0x114', 'Nl51')])[_kod_0x1c17('0x115', 'W!^z')](_0x7a7d1f[_kod_0x1c17('0x116', 'MzDl')]));
                }
            }
        }), void $('.aui-title\x20img,.aui-title\x20.x-item-file')['die'](_kod_0x1c17('0x117', '7dBm'))[_kod_0x1c17('0x118', 'D*jI')](_0x30345e[_kod_0x1c17('0x119', '4o4j')],
        function(_0x5962ba) {
            var _0x127573 = $(this)['offset']();
            _0x127573[_kod_0x1c17('0x11a', 'RapS')] += $(this)[_kod_0x1c17('0x11b', '6SFe')](),
            $(this)[_kod_0x1c17('0x11c', 'oVyk')]()[_kod_0x1c17('0x11d', 'Ux%V')]()[_kod_0x1c17('0x11e', 'pXx7')]({
                'x': _0x5962ba['pageX'],
                'y': _0x127573['top']
            });
        })[_kod_0x1c17('0x11f', 'W!^z')]('dblclick')['live'](_kod_0x1c17('0x120', 'W1Ei'),
        function(_0x32d954) {
            if (_0x30345e[_kod_0x1c17('0x121', 'MR2y')] === _0x30345e[_kod_0x1c17('0x122', '!^I3')]) {
                var _0x2212b6 = '8|7|0|2|6|3|5|4|1' [_kod_0x1c17('0x123', 'IRQA')]('|'),
                _0x59e940 = 0x0;
                while ( !! []) {
                    switch (_0x2212b6[_0x59e940++]) {
                    case '0':
                        if (_0x7a7d1f[_kod_0x1c17('0x124', 'RapS')](_kod_0x1c17('0x125', 'v%84'), typeof f)) var _0x246a95 = _0x7a7d1f['cXyQK'](_0x7a7d1f[_kod_0x1c17('0x126', 'MzDl')]('<li\x20class=\x22context-menu-item\x20', _0x240515), '\x20context-menu-separator\x20not-selectable\x22></li>');
                        else {
                            var _0x1688d9 = f[_kod_0x1c17('0x127', 'W1Ei')];
                            f[_kod_0x1c17('0x128', '9#0*')] && (_0x1688d9 += '(<span\x20class=\x22context-menu-accesskey\x22>' + f[_kod_0x1c17('0x129', '8YZl')] + _0x7a7d1f[_kod_0x1c17('0x12a', 'oZSO')]);
                            var _0x246a95 = _0x7a7d1f['aHEoa'](_0x7a7d1f[_kod_0x1c17('0x12b', 'KUyF')](_0x7a7d1f[_kod_0x1c17('0x12c', 'V45V')](_0x7a7d1f[_kod_0x1c17('0x12d', 'oVyk')](_kod_0x1c17('0x12e', 'W!^z') + _0x240515, '\x22>'), h(f[_kod_0x1c17('0x12f', 'gdK)')])) + _kod_0x1c17('0x130', '4uJC'), _0x1688d9), _kod_0x1c17('0x131', '!r$W'));
                        }
                        continue;
                    case '1':
                        if (_0x6ddab6 && (_0x6ddab6['items'] || (_0x6ddab6[_kod_0x1c17('0x132', 'GV$8')] = {}), _0x6ddab6['items'][_0x127573] = _0x5cfc8d), _0x7a7d1f[_kod_0x1c17('0x133', 'V45V')]('string', typeof f) && (_0x32d954[_kod_0x1c17('0x134', 'Nl51')] || (_0x32d954[_kod_0x1c17('0x134', 'Nl51')] = {}), _0x32d954[_kod_0x1c17('0xad', 'u$27')][_0x127573] = _0x5cfc8d, e[_kod_0x1c17('0x135', '7dBm')][_0x127573] = _0x5cfc8d, e[_kod_0x1c17('0x136', 'u$27')][_0x127573] = function(_0x246b9c, _0xdeefc8) {
                            f[_kod_0x1c17('0x137', 'ZT7D')](_0x246b9c, _0xdeefc8);
                        },
                        f['accesskey'] && (e[_kod_0x1c17('0x138', 'Voly')][f['accesskey']] = _0x5cfc8d), f['items'])) {
                            var _0x4baa33 = _0x127573 + _0x7a7d1f[_kod_0x1c17('0x139', 'LE8V')],
                            _0x246a95 = _0x7a7d1f[_kod_0x1c17('0x13a', '4o4j')](_kod_0x1c17('0x13b', '!Ss*') + _0x127573 + _kod_0x1c17('0x13c', 'Xvs@') + _0x4baa33, '\x22><span></span></li>\x09\x09\x09\x09\x09</ul>');
                            _0x7a7d1f[_kod_0x1c17('0xec', '8YZl')]($, _0x246a95)[_kod_0x1c17('0x13d', 'Xvs@')](_0x2e527a),
                            _0x5cfc8d[_kod_0x1c17('0x13e', 'oVyk')] = _0x2e527a['find'](_0x7a7d1f[_kod_0x1c17('0x13f', '4o4j')] + _0x127573),
                            _0x5cfc8d['callback'] = null,
                            _0x5cfc8d['appendTo'] = _0x5cfc8d[_kod_0x1c17('0x140', '3%Aj')],
                            _0x5cfc8d[_kod_0x1c17('0x141', 'MR2y')] = 'sub',
                            _0x2e527a[_kod_0x1c17('0x142', 'yfxJ')](_kod_0x1c17('0x143', '!r$W'), _0x5cfc8d)[_kod_0x1c17('0x144', 'pXx7')](_0x7a7d1f[_kod_0x1c17('0x145', 'v%84')]),
                            _0x2e527a['find'](_0x7a7d1f[_kod_0x1c17('0x146', 'yfxJ')] + _0x127573)[_kod_0x1c17('0x147', 'ZT7D')]({
                                'contextMenuRoot': e,
                                'contextMenu': _0x5cfc8d
                            }),
                            _0x2e527a[_kod_0x1c17('0x148', 'V45V')](_0x7a7d1f['cIVWe'](_kod_0x1c17('0x149', 'ZT7D'), _0x4baa33))[_kod_0x1c17('0x14a', 'oVyk')]({
                                'contextMenuRoot': e,
                                'contextMenuKey': _0x4baa33,
                                'contextMenu': _0x5cfc8d
                            }),
                            _0x5cfc8d[_kod_0x1c17('0x14b', '4o4j')] || (_0x5cfc8d['items'] = {}),
                            _0x5cfc8d[_kod_0x1c17('0x14c', 'eudT')][_0x4baa33] = {
                                '$input': null,
                                '$label': null,
                                'icon': '',
                                'name': '',
                                '_name': '',
                                '$node': _0x2e527a['find'](_kod_0x1c17('0x14d', 'pvcY') + _0x4baa33)
                            },
                            i(_0x5cfc8d, f[_kod_0x1c17('0xd8', '!Ss*')], _0x7a7d1f['MAdAW']('.', _0x4baa33));
                        }
                        continue;
                    case '2':
                        var _0x2e527a = $(_0x246a95)[_kod_0x1c17('0x14e', '6!)d')](),
                        _0x3bb819 = _0x326919 || d,
                        _0x3d0a2a = _0x32d954[_kod_0x1c17('0x14f', 'ZT7D')]['find'](_0x3bb819)['first']();
                        continue;
                    case '3':
                        var _0x6ddab6 = _0x2e527a['parent'](_kod_0x1c17('0x150', 'V45V'))[_kod_0x1c17('0x151', '!^I3')](_0x7a7d1f[_kod_0x1c17('0x152', '6SFe')]);
                        continue;
                    case '4':
                        var _0x5cfc8d = {};
                        _0x5cfc8d['$input'] = null;
                        _0x5cfc8d[_kod_0x1c17('0x153', 'Xvs@')] = null;
                        _0x5cfc8d['accesskey'] = f.accesskey;
                        _0x5cfc8d[_kod_0x1c17('0xbb', 'lqYJ')] = f.className;
                        _0x5cfc8d['icon'] = f.icon;
                        _0x5cfc8d[_kod_0x1c17('0x9d', ']2ac')] = f.name;
                        _0x5cfc8d[_kod_0x1c17('0x154', ']%0g')] = _0x1688d9;
                        _0x5cfc8d['$node'] = _0x2e527a;
                        continue;
                    case '5':
                        _0x2e527a['data']({
                            'contextMenu':
                            _0x6ddab6,
                            'contextMenuKey': _0x127573,
                            'contextMenuRoot': e
                        });
                        continue;
                    case '6':
                        _0x7a7d1f[_kod_0x1c17('0x155', ']s5X')](0x0, _0x3d0a2a[_kod_0x1c17('0x156', '6!)d')]) && _0x32d954[_kod_0x1c17('0x157', 'D*jI')][_0x3bb819] && (_0x3d0a2a = _0x32d954[_kod_0x1c17('0x158', '@sw&')][_0x3bb819]['$node']),
                        _0x7a7d1f[_kod_0x1c17('0x159', 'GV$8')](0x0, _0x3d0a2a['length']) && (_0x3d0a2a = _0x32d954['$menu'][_kod_0x1c17('0x15a', 'b7gp')]()[_kod_0x1c17('0x15b', 'JX9h')]()),
                        _0x326919 ? _0x3d0a2a[_kod_0x1c17('0x15c', 'KUyF')](_0x2e527a) : d && _0x3d0a2a[_kod_0x1c17('0x15d', 'yfxJ')](_0x2e527a);
                        continue;
                    case '7':
                        var _0x240515 = _0x7a7d1f[_kod_0x1c17('0x15e', '8YZl')](_0x127573, '\x20') + f[_kod_0x1c17('0x15f', 'ZT7D')];
                        continue;
                    case '8':
                        f['className'] = f[_kod_0x1c17('0x160', '6SFe')] || '';
                        continue;
                    }
                    break;
                }
            } else {
                var _0x127573 = $(this)[_kod_0x1c17('0x161', 'eudT')]()[_kod_0x1c17('0x162', 'JX9h')]()[_kod_0x1c17('0x163', 'MR2y')]('id'),
                _0x326919 = $[_kod_0x1c17('0x164', 'LE8V')][_kod_0x1c17('0x165', 'oVyk')][_0x127573];
                _0x326919[_kod_0x1c17('0x166', 'KUyF')](),
                $[_kod_0x1c17('0x167', '@sw&')]['hidden']();
            }
        }));
    };
    Hook[_kod_0x1c17('0x168', '8YZl')](_kod_0x1c17('0x169', 'JX9h'),
    function(_0x28b9ae, _0x19266f) {
        var _0x326919 = _0x28b9ae[_kod_0x1c17('0x16a', '4o4j')]('id'),
        _0x5cadac = $[_kod_0x1c17('0x16b', '9#0*')][_kod_0x1c17('0x16c', ']2ac')][_0x326919],
        _0x2e21b9 = _0x30345e[_kod_0x1c17('0x16d', '9#0*')],
        _0x400cd4 = _0x30345e[_kod_0x1c17('0x16e', 'v%84')];
        _0x5cadac[_kod_0x1c17('0x16f', 'V45V')]() ? _0x19266f['find'](_0x400cd4)[_kod_0x1c17('0x170', 'KUyF')](_0x2e21b9) : _0x19266f[_kod_0x1c17('0x171', 'pXx7')](_0x400cd4)['addClass'](_0x2e21b9);
        var _0x645979 = _kod_0x1c17('0x172', '6SFe');
        $('.' + _0x326919)['hasClass']('dialog-can-resize') ? _0x19266f[_kod_0x1c17('0x173', '9#0*')](_0x645979)[_kod_0x1c17('0x174', 'u$27')](_0x2e21b9) : _0x19266f[_kod_0x1c17('0x175', 'Ux%V')](_0x645979)[_kod_0x1c17('0x176', '5hav')](_0x2e21b9);
    }),
    _0x326919();
});;
define("app/app/appBase", [],
function(a, b) {
    var c = {},
    d = {},
    e = {},
    f = !1,
    g = function(a) {
        a.title = void 0 == a.title ? a.name: a.title,
        void 0 == a.name && (a.name = UUID(), a.hidden = !0),
        c[a.name] = a,
        a.ext || (a.ext = "");
        var b = a.ext.split(",");
        c[a.name].extArr = b,
        "undefined" != typeof a.sort ? a.sort = parseInt(a.sort) : a.sort = 0;
        for (var e = 0; e < b.length; e++) {
            var f = trim(b[e]);
            c[a.name].extArr[e] = f,
            d[f] || (d[f] = []);
            for (var g = !1,
            h = 0; h < d[f].length; h++) if (d[f][h].name == a.name) {
                g = !0;
                break
            }
            g || (d[f].push({
                name: a.name,
                sort: a.sort
            }), d[f].length > 1 && d[f].sort(function(a, b) {
                return a.sort < b.sort
            }))
        }
        Hook.trigger("kodApp.add.finished")
    },
    h = function() {
        return d
    },
    i = function(a) {
        if (!a || !c[a]) return ! 1;
        delete c[a];
        for (var b in e) if (e[b] == a) {
            delete e[b];
            break
        }
        for (var b in d) {
            for (var f = d[b], g = [], h = 0; h < f.length; h++) f[h].name != a && g.push(f[h]);
            0 == g.length ? delete d[b] : d[b] = g
        }
    },
    j = function(a) {
        if ("undefined" == typeof a) {
            var b = [];
            for (var f in c) c[f].hidden || b.push(c[f]);
            return b
        }
        var g = e[a],
        b = [];
        if (!g && !d[a]) return ! 1;
        if (g && (c[g] ? b.push(c[g]) : delete e[a]), !d[a]) return b;
        for (var h = 0; h < d[a].length; h++) {
            var i = d[a][h].name;
            c[i] && i != g && b.push(c[i])
        }
        return b
    },
    k = function(a) {
        f = a
    },
    l = function() {
        return f
    },
    m = function(a, b, d) {
        if ("" != a) {
            b && "file" != b || (b = core.pathExt(a)),
            d = d ? d: "";
            var e = {
                path: a,
                ext: b,
                appName: d
            };
            if (!Hook.trigger("kodApp.open.before", e)) {
                if (a = e.path, b = e.ext, d = e.appName) var f = c[d];
                else {
                    var g = j(b);
                    if (!g || 0 == g.length) return void kodApp.openUnknow(a, "");
                    var f = g[0]
                }
                if (!f) return Tips.tips("[" + d + "] not exists", !1);
                try {
                    n(f, a, b)
                } catch(h) {
                    console.error("kodApp.open error:", h)
                }
            }
        }
    },
    n = function(a, b, c) {
        Hook.trigger("kodApp.callback.before", a, b, c) || (a.callback(b, c), Hook.trigger("kodApp.callback.after", b, c, a))
    },
    o = function(a) {
        var b = j(a),
        d = j("");
        "" == a && (b = !1),
        b ? b.push({
            name: ""
        }) : b = [],
        b = b.concat(d);
        for (var e = {},
        f = 0; f < b.length; f++) {
            var g = b[f];
            "" == g.name || g.hidden ? e["step-line"] = "-------": e[g.name] = {
                app: g.name,
                name: g.title,
                className: g.className,
                icon: g.icon,
                callback: function(a, b) {
                    var d = c[a];
                    if (d && d.callback) {
                        $(".context-menu-active");
                        if ($(".context-menu-active").hasClass("menu-tree-file")) var e = ui.tree.makeParam();
                        else var e = ui.path.makeParam();
                        n(d, e.path, e.type)
                    }
                }
            }
        }
        return e
    },
    p = function(a, b) {
        q(a, b),
        G.userConfig.kodAppDefault = htmlEncode(jsonEncode(e)),
        G.shareInfo || $.get(G.appHost + "setting/set&k=kodAppDefault&v=" + jsonEncode(e))
    },
    q = function(a, b) {
        if (!c[b]) return ! 1;
        if ("string" == typeof a) e[a] = b;
        else if ($.isArray(a)) for (var d = 0; d < a.length; d++) e[a[d]] = b;
        else if ($.isArray(c[b].extArr)) for (var f = c[b].extArr, d = 0; d < f.length; d++) e[f[d]] = b
    },
    r = function() {
        G.userConfig.kodAppDefault = "[]",
        e = {}
    },
    s = function(a, b) {
        var a = c[a];
        return a ? b ? inArray(a.extArr, b) : a.ext: !1
    },
    t = function(a, b, e) {
        var a = c[a];
        if (!a) return ! 1;
        var f = "undefined" == e ? 0 : parseInt(e);
        0 == f && "undefined" != typeof a.sort && (f = parseInt(a.sort)),
        "string" == $.type(b) && (b = b.split(","));
        for (var g = 0; g < b.length; g++) {
            var h = b[g];
            if (h) {
                inArray(a.extArr, h) || a.extArr.push(h),
                d[h] || (d[h] = []);
                for (var i = !1,
                j = 0; j < d[h].length; j++) d[h][j].name != a.name || (d[h][j].sort = f, i = !0);
                i || d[h].push({
                    name: a.name,
                    sort: f
                })
            }
        }
    },
    u = function() {
        if (G.userConfig && G.userConfig.kodAppDefault) try {
            var a = G.userConfig.kodAppDefault;
            a = jsonDecode(htmlDecode(a)),
            $.isPlainObject(a) && (e = a)
        } catch(b) {}
        Hook.bind("rightMenu.show.menu-file,rightMenu.show.menu-tree-file",
        function(a, b) {
            if (a.hasClass("menu-tree-file")) var c = ui.tree.makeParam();
            else var c = ui.path.makeParam();
            var d = core.pathExt(c.path),
            e = "hidden";
            if (kodApp.getApp(d)) {
                var f = kodApp.getAppMenu(d);
                b.find("li.open-with.context-menu-submenu").removeClass(e),
                b.find("ul.context-menu-list.open-with .context-menu-item").not(".open-with-first").remove(),
                $.contextMenu.menuAdd(f, ".menu-file", ".open-with-first"),
                $.contextMenu.menuAdd(f, ".menu-tree-file", ".open-with-first")
            } else b.find("li.open-with.context-menu-submenu").addClass(e)
        }),
        Hook.trigger("kodApp.ready")
    };
    return u(),
    {
        debug: function() {
            return {
                appList: c,
                openDefault: d,
                openUser: e
            }
        },
        add: g,
        remove: i,
        appSupportCheck: s,
        appSupportSet: t,
        getApp: j,
        getAppBind: h,
        getAppMenu: o,
        setLastOpenTarget: k,
        getLastOpenTarget: l,
        setOpenUser: p,
        setOpenUserLocal: q,
        clearOpenUser: r,
        open: m
    }
});;
define("app/app/editor", [],
function(a, b) {
    kodApp.add({
        name: "aceEditor",
        title: LNG["Plugin.default.aceEditor"],
        sort: 0,
        ext: "txt,textile,oexe,inc,csv,log,asc,tsv,lnk,url,webloc,meta,localized,xib,xsd,storyboard,plist,csproj,pch,pbxproj,local,xcscheme,manifest,vbproj,strings,jshintrc,sublime-project,readme,changes,changelog,version,license,changelog,abap,abc,as,asp,aspx,ada,adb,htaccess,htgroups,htgroups,htpasswd,asciidoc,adoc,asm,a,ahk,bat,cmd,cpp,c,cc,cxx,h,hh,hpp,ino,c9search_results,cirru,cr,clj,cljs,cbl,cob,coffee,cf,cson,cakefile,cfm,cs,css,curly,d,di,dart,diff,patch,dockerfile,dot,dummy,dummy,e,ge,ejs,ex,exs,elm,erl,hrl,frt,fs,ldr,ftl,gcode,feature,.gitignore,glsl,frag,vert,gbs,go,groovy,haml,hbs,handlebars,tpl,mustache,hs,hx,html,hta,htm,xhtml,eex,html.eex,erb,rhtml,html.erb,ini,inf,conf,cfg,prefs,io,jack,jade,java,ji,jl,jq,js,jsm,json,jsp,jsx,latex,ltx,bib,lean,hlean,less,liquid,lisp,ls,logic,lql,lsl,lua,lp,lucene,Makefile,makemakefile,gnumakefile,makefile,ocamlmakefile,make,md,markdown,mask,matlab,mz,mel,mc,mush,mysql,nc,nix,nsi,nsh,m,mm,ml,mli,pas,p,pl,pm,pgsql,php,phtml,shtml,php3,php4,php5,phps,phpt,aw,ctp,module,ps1,praat,praatscript,psc,proc,plg,prolog,properties,proto,py,r,cshtml,rd,rhtml,rst,rb,ru,gemspec,rake,guardfile,rakefile,gemfile,rs,sass,scad,scala,scm,sm,rkt,oak,scheme,scss,sh,bash,bashrc,sjs,smarty,tpl,snippets,soy,space,sql,sqlserver,styl,stylus,svg,swift,tcl,tex,toml,twig,swig,ts,typescript,str,vala,vbs,vb,vm,v,vh,sv,svh,vhd,vhdl,wlk,wpgm,wtest,xml,rdf,rss,wsdl,xslt,atom,mathml,mml,xul,xbl,xaml,xq,yaml,yml,vcproj,vcxproj,vtt,filters,cer,reg,config,pem,srt,ass,lrc,opf,ncx",
        icon: G.staticPath + "images/file_icon/icon_app/ace.png",
        callback: function(a, b) {
            var c = ShareData.frameTop();
            if ("undefined" != typeof c.Editor) return void c.Editor.add(urlEncode(a));
            if (core.isApp("editor")) return void ShareData.frameChild("OpenopenEditor",
            function(b) {
                b.Editor.add(urlEncode(a))
            });
            if (ShareData.frameTop("OpenopenEditor")) {
                var d = c.$.dialog.list.openEditor,
                e = 0;
                d && "hidden" == $(d.DOM.wrap).css("visibility") && (e = 200, d.display(!0).zIndex().focus()),
                setTimeout(function() {
                    ShareData.frameTop("OpenopenEditor",
                    function(b) {
                        b.Editor.add(urlEncode(a))
                    })
                },
                e)
            } else {
                var f = G.appHost + "editor/edit#filename=" + urlEncode(a);
                "undefined" != typeof G.sharePage && (f = G.appHost + "share/edit&user=" + G.user + "&sid=" + G.sid + "#filename=" + urlEncode(a));
                var g = htmlEncode(urlDecode(core.pathThis(a))),
                h = {
                    closeBefore: function() {
                        var a = ShareData.frameTop("OpenopenEditor"),
                        b = this;
                        return a && a.Editor && a.Editor.hasFileSave() ? ($.dialog.confirm(LNG.if_save_file_tips,
                        function() {
                            b.config.closeBefore = !1,
                            b.close()
                        },
                        function() {}), !1) : void 0
                    }
                };
                core.openDialog(f, core.icon("edit"), g, "openEditor", h)
            }
        }
    });
    var c = ShareData.frameTop();
    c.Config && "editor" == c.Config.pageApp && kodApp.setOpenUserLocal(!1, "aceEditor")
});;
define("app/app/openWith", [],
function(a, b) {
    kodApp.add({
        name: "appOpenSetting",
        title: LNG["Explorer.UI.appSetDefault"],
        ext: "",
        icon: G.staticPath + "images/file_icon/icon_others/setting.png",
        callback: function(a, b) {
            var c = "<ul class='tab-group {{if !apps}}hidden{{/if}}' role='tablist'>				<li class='tab-item {{if apps}}active{{/if}}'>					<a href='#app-list-support'aria-controls='app-list-support' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeSupport']}}</a>				</li>				<li class='tab-item {{if !apps}}active{{/if}}' >					<a href='#app-list_all' aria-controls='app-list_all' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeAll']}}</a>				</li>			</ul>			<div class='tab-content'>				<div class='app-list tab-pane {{if apps}}active{{/if}}' id='app-list-support'>					{{each apps app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}					<div class='clear'></div>				</div>				<div class='app-list tab-pane {{if !apps}}active{{/if}}' id='app-list_all'>					{{each appAll app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}				</div>			</div>			<div class='bottom mt-10'>				<input class='kui-checkbox size-small' type='checkbox' id='app-default-checkbox' {{if apps}}checked='true'{{/if}}/>				<label for='app-default-checkbox'>{{LNG['Explorer.UI.appAwaysOpen']}}</label>			</div>",
            d = kodApp.getApp(b),
            e = !1;
            _.isArray(d) && (e = d[0].name);
            var f = template.compile(c),
            g = f({
                LNG: LNG,
                apps: d,
                defaultApp: e,
                appAll: kodApp.getApp()
            }),
            h = $.dialog({
                id: "dialog-app-select",
                className: "menu-empty",
                padding: 0,
                fixed: !0,
                ico: core.icon("search"),
                resize: !0,
                title: LNG["Explorer.UI.selectAppDesc"],
                width: 480,
                height: 360,
                padding: "20px",
                content: g,
                ok: function() {
                    return i()
                }
            }),
            i = function() {
                var c = $("#app-default-checkbox").prop("checked"),
                d = $(".app-list.active .app-item.select").attr("data-app");
                return d ? (h.close(), kodApp.open(a, b, d), c && kodApp.setOpenUser(b, d), !0) : (Tips.tips(LNG["Explorer.UI.selectAppWarning"], "warning"), !1)
            };
            $(".tab-group .tab-item").die("click").live("click",
            function() {
                var a = $(this).find("[aria-controls]").attr("aria-controls");
                "app-list-support" == a ? $("#app-default-checkbox").prop("checked", !0) : $("#app-default-checkbox").prop("checked", !1)
            }),
            $(".app-item").die("click").live("click",
            function() {
                $(this).parent().find(".select").removeClass("select"),
                $(this).addClass("select")
            }).die("dblclick").live("dblclick",
            function() {
                i()
            })
        }
    })
});;
define("app/app/html", [],
function(a, b) {
    var c = function(a) {
        return void 0 == a ? !1 : 0 === a.indexOf("http") ? !0 : G.shareInfo || core.pathReadable(a) ? !0 : (Tips.tips(LNG.no_permission_read_all, !1), core.playSound("error"), !1)
    };
    Hook.bind("kodApp.open.before",
    function(a) {
        return "folder" == a.ext ? (core.isApp("explorer") || isWap() ? ui.path.list(a.path + "/") : core.explorer(a.path), !0) : c(a.path) ? void("file" == a.ext && (a.ext = "")) : !0
    }),
    kodApp.openUnknow = function(a, b) {
        void 0 == b && (b = "");
        var c = G.appHost + "pluginApp/index&search=" + core.pathExt(a),
        d = "kodApp.open(pathHashDecode('" + pathHashEncode(a) + "'),false,'appOpenSetting');",
        e = "kodApp.open(pathHashDecode('" + pathHashEncode(a) + "'),false,'aceEditor');",
        f = "kodApp.download(pathHashDecode('" + pathHashEncode(a) + "'));",
        g = "core.openWindow('" + c + "');",
        h = LNG.unknow_file_try + '<a class="pl-5 pr-5" href="javascript:void(0);" onclick="',
        i = '<div class="unknow-file can-select" style="word-break:break-all;">				<div class="grey-8 bold mb-20">' + LNG.unknow_file_tips + "<br/>" + b + '</div>			    <div class="mt-5">1.' + h + d + '">' + LNG["Explorer.UI.openWith"] + '</a></div>			    <div class="mt-5">2.' + h + e + '">' + LNG["Explorer.UI.openWithText"] + '</a></div>			    <div class="mt-5">3.' + h + f + '">' + LNG.unknow_file_download + '</a></div>				<div class="mt-20">' + h + g + '">' + LNG.PluginCenter + "</a>" + LNG.unknow_plugin_search + "</div>			</div>";
        $.dialog({
            fixed: !0,
            icon: "warning",
            title: LNG.unknow_file_title,
            padding: "20px 50px",
            content: i,
            cancel: !0
        }),
        $(".unknow-file a").unbind("click").bind("click",
        function(a) {
            return $(this).parents(".artDialog").data("artDialog").close(),
            stopPP(a)
        })
    },
    kodApp.add({
        name: "download",
        title: LNG.download,
        hidden: !0,
        icon: "x-item-file x-html",
        callback: function(a, b) {
            if (c(a)) {
                var d = a;
                "http" != a.substr(0, 4) && (d = G.appHost + "explorer/fileDownload&accessToken=" + G.accessToken + "&path=" + urlEncode(a), "undefined" != typeof G.sharePage && (d = G.appHost + "share/fileDownload&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(a))),
                $.dialog({
                    icon: "succeed",
                    title: !1,
                    time: 1.5,
                    content: LNG.download_ready + "..."
                }),
                isWap() ? window.open(d) : $('<iframe src="' + d + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
            }
        }
    }),
    kodApp.download = function(a) {
        kodApp.open(a, "", "download")
    },
    kodApp.openWindow = function(a) {
        kodApp.open(a, "", "browserOpen")
    },
    kodApp.add({
        name: "browserOpen",
        title: LNG.open_ie,
        sort: -100,
        icon: "x-item-file x-html",
        callback: function(a, b) {
            var d = core.path2url(a);
            return "/" == a.substr( - 1) && -1 != d.search("explorer/fileProxy&") ? Tips.tips(LNG.path_can_not_action, !1) : void(c(a) && (isWap() ? window.location.href = d: window.open(d)))
        }
    }),
    kodApp.add({
        name: "swfPlayer",
        title: "Flash Player",
        ext: "swf",
        icon: "x-item-file x-swf",
        callback: function(a, b) {
            $.dialog({
                resize: !0,
                fixed: !0,
                ico: core.icon(b),
                title: core.pathThis(a),
                width: "75%",
                height: "65%",
                padding: 0,
                content: core.createFlash(core.path2url(a))
            })
        }
    }),
    kodApp.add({
        name: "webLink",
        title: "webLink",
        ext: "url,webloc",
        sort: 10,
        icon: "x-item-file x-html",
        callback: function(a, b) {
            core.fileGet(a,
            function(c) {
                if ("url" == b) {
                    var d = c.match(/URL=(.*)/);
                    if (d.length >= 2) return window.open(d[1])
                } else if ("webloc" == b) try {
                    var e = $($.parseXML(c)),
                    f = e.find("string").text();
                    return void window.open(f)
                } catch(g) {}
                kodApp.open(a, b, "editor")
            })
        }
    }),
    kodApp.add({
        name: "htmlView",
        title: LNG["Plugin.default.htmlView"],
        ext: "htm,html,shtml",
        sort: 10,
        icon: "x-item-file x-html",
        callback: function(a, b) {
            var c = core.path2url(a);
            core.openDialog(c, core.icon("html"), core.pathThis(a))
        }
    }),
    kodApp.add({
        name: "pdfView",
        title: "PDF Simple",
        ext: "pdf",
        sort: 0,
        icon: "x-item-file x-pdf",
        callback: function(a, b) {
            var c = core.path2url(a),
            d = "pdf" + UUID(),
            e = '<div id="' + d + '" style="height:100%;">			<a href="' + c + '" target="_blank" style="display:block;margin:0 auto;margin-top:80px;font-size:16px;text-align:center;">' + LNG.error + " " + LNG.download + " PDF</a></div>";
            $.dialog({
                resize: !0,
                fixed: !0,
                ico: core.icon(b),
                title: core.pathThis(a),
                width: "80%",
                height: "75%",
                padding: 0,
                content: e
            }),
            PDFObject.embed(c, "#" + d)
        }
    }),
    kodApp.add({
        name: "oexeOpen",
        title: LNG["kodApp.oexe.open"],
        ext: "oexe",
        sort: 100,
        icon: " x-item-file x-oexe",
        callback: function(a, b) {
            core.fileGet(a,
            function(b) {
                var c = jsonDecode(b);
                c.name = core.pathThis(a),
                core.openApp(c)
            })
        }
    }),
    kodApp.add({
        name: "oexeEdit",
        title: LNG["kodApp.oexe.edit"],
        ext: "oexe",
        sort: 50,
        icon: "icon-edit ",
        callback: function(a, b) {
            core.fileGet(a,
            function(b) {
                var c = jsonDecode(b);
                c.name = core.pathThis(a),
                c.path = a,
                ui.path.pathOperate.appEdit(c)
            })
        }
    });
    var d = {
        createApp: {
            name: LNG.app_create,
            className: "createApp newfile",
            icon: "icon-puzzle-piece x-item-file x-oexe",
            callback: function(a, b) {
                ui.path.pathOperate.appEdit(0, 0, "userAdd")
            }
        }
    };
    $.contextMenu.menuAdd(d, ".menu-body-main", ".app-install"),
    $.contextMenu.menuAdd(d, ".toolbar-path-more", ".app-install"),
    $.contextMenu.menuAdd(d, ".bodymain", ".app-install"),
    Hook.bind("rightMenu.show",
    function(a, b, c) {
        var d = [".menu-folder", ".menu-file", ".menu-tree-folder", ".menu-tree-file", ".menu-tree-folder-fav"];
        if (c.find(".context-menu-submenu").fadeOut(0).delay(0).fadeIn(0), c.removeClass("menu-auto-fit"), h(b), c.inScreen() || c.addClass("menu-auto-fit"), ".menu-body-main" == a) {
            var e = c.find(".set-file-icon-size.context-menu-submenu");
            "icon" == G.userConfig.listType ? e.removeClass("hidden") : e.addClass("hidden")
        }
        if (_.include(d, a)) {
            var f = "disabled",
            g = ".cute,.rname,.remove",
            i = ".open,.open-text,.down,.share,.copy,.cute,.rname,.remove,.open-browser,.search,.more-action";
            b.hasClass("file-not-readable") ? c.find(i).addClass(f) : c.find(i).removeClass(f),
            b.hasClass("file-not-writeable") ? c.find(g).addClass(f) : c.find(g).removeClass(f)
        }
    }),
    Hook.bind("rightMenu.show.menu-body-main",
    function(a, b) {
        var c = ".upload,.past,.newfolder,.newfile",
        d = "disabled";
        _.get(G, "jsonData.info.canUpload") ? b.find(c).removeClass(d) : b.find(c).addClass(d)
    }),
    Hook.bind("rightMenu.show.menu-file",
    function(a, b) {
        if ($(".context-menu-active").hasClass("menu-tree-file")) var c = ui.tree.makeParam();
        else var c = ui.path.makeParam();
        var d = core.pathExt(c.path),
        e = "hidden";
        inArray(["jpg", "jpeg", "png"], d) ? b.find(".set-background").removeClass(e) : b.find(".set-background").addClass(e)
    });
    var e = function() {
        var a = ".close-item,.refresh,.newfile,.past,.info",
        b = ".open-browser",
        c = ".explorer,.create-project,.open-project",
        d = ".close-item,.newfile,.refresh,.past,.down,.copy,.cute,.remove,.more-action,.clone,.info,.zip,.zip-zip,.zip-tar,.zip-tgz",
        e = ".newfile,.cute,.past,.rname,.zip,.remove,.clone,.create-link-home,.create-link,.create-project",
        f = $(".menu-tool-path"),
        g = "hidden",
        h = ui.fileLight.fileListSelect();
        f.find(".context-menu-item").addClass(g),
        0 == h.length ? f.find(a).removeClass(g) : 1 == h.length ? (f.find(".context-menu-item").removeClass(g), "folder" == ui.fileLight.type(h) ? f.find(b).addClass(g) : f.find(c).addClass(g)) : h.length > 1 && f.find(d).removeClass(g),
        G.jsonData && G.jsonData.info && G.jsonData.info.canUpload === !1 && f.find(e).filter(":not(." + g + ")").addClass(g)
    },
    f = function() {
        var a = ui.fileLight.fileListSelect(),
        b = $(".kod-toolbar-path .select-button-show"),
        c = "hidden";
        G.jsonData && G.jsonData.info && (0 == a.length || G.jsonData.info.pathType == G.KOD_USER_SHARE && G.jsonData.info.id != G.userID ? b.addClass("hidden") : (b.removeClass("hidden"), b.find("[data-action=share]").removeClass(c), b.find("[data-action=rname]").removeClass(c), a.length > 1 && (b.find("[data-action=share]").addClass(c), b.find("[data-action=rname]").addClass(c))))
    },
    g = function() {
        var a = _.get(G, "jsonData.info.pathType"),
        b = $(".kod-toolbar-share .select-button-show-share"),
        c = ui.fileLight.fileListSelect(),
        d = "hidden";
        a != G.KOD_USER_SHARE || 0 == c.length ? b.addClass("hidden") : (b.removeClass("hidden"), b.find("[data-action=shareEdit]").removeClass(d), b.find("[data-action=shareOpenWindow]").removeClass(d), c.length > 1 && (b.find("[data-action=shareEdit]").addClass(d), b.find("[data-action=shareOpenWindow]").addClass(d)))
    };
    Hook.bind("explorer.fileSelect.init",
    function() {
        ui.fileLight.listNumberSet()
    }),
    Hook.bind("explorer.fileSelect.change",
    function() {
        e(),
        f(),
        g(),
        ui.fileLight.selectNumSet()
    }),
    Hook.bind("rightMenu.show.toolbar-path-more",
    function() {
        e()
    }),
    Hook.bind("rightMenu.initFinished",
    function() {
        if (1 != G.isRoot) {
            var a = "hidden",
            b = {
                "explorer.fileDownload": "@.down,@.download,@.share,@.open-text,[data-action=download]",
                "explorer.search": "@.search",
                "explorer.mkfile": "@.newfile,[data-action=newfile],@.past,@.clone",
                "explorer.mkdir": "@.newfolder,[data-action=newfolder]",
                "explorer.pathRname": "@.rname,[data-action=rname]",
                "explorer.pathDelete": "@.remove,@.remove + .context-menu-separator,[data-action=remove]",
                "explorer.pathCopy": "@.cute,@.copy,[data-action=cute],[data-action=copy]",
                "explorer.fileUpload": "@.upload,@.upload-more,[data-action=upload],[data-action=upload-more]",
                "explorer.unzip": "@.unzip",
                "explorer.zip": "@.zip",
                "userShare.set": "@.share,[data-action=share]"
            };
            setTimeout(function() {
                for (var c in b) {
                    var d = replaceAll(b[c], "@", ".context-menu-list ");
                    core.authCheck(c) || $(d).addClass(a)
                }
            },
            100),
            core.authCheck("explorer.fileDownload") || (kodApp.remove("browserOpen"), kodApp.remove("htmlView"))
        }
    }),
    Hook.bind("kodApp.callback.before",
    function(a, b, c) {
        return - 1 == $.inArray(a.name, ["browserOpen", "htmlView", "zipView"]) || core.authCheckGroup("explorer.fileDownload", b) ? void 0 : (Tips.tips(LNG.no_permission_action, "error"), !0)
    });
    var h = function(a) {
        return
    },
    i = function() {
        if (G.authGroupRole || (G.authGroupRole = {}), _.get(G, "jsonData.info.pathType") == G.KOD_GROUP_PATH) {
            var a = _.get(G, "jsonData.info.id");
            G.authGroupRole[a] = _.get(G, "jsonData.info.groupRole.authArr")
        }
        h()
    };
    Hook.bind("explorer.path.ajaxLive", i)
});;
define("app/common/tpl/copyright.html", [], '<div class="dialog-copyright-content">\n	<div class="title">\n		<div class="logo">\n			<i class="icon-cloud"></i>\n			{{if kod.window.core.versionType==\'A\'}}KodExplorer {{else}} {{LNG.kod_name}} {{/if}} v{{G.version}}\n		</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{@LNG.copyright_desc}}</p>\n		<div>{{@LNG.copyright_contact}}</div>\n		<div>{{@LNG.copyright_info}}</div> \n	</div>\n</div>\n');;
define("app/common/tpl/themeDIY.html", [], "@media screen and (max-width:100000px) {\n	body .full-background{\n		position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\n		background-color: #020202;background-size: 100% 100%;\n	}\n\n	{{if blurSize= (bgBlur==0?0:10) }}{{/if}}\n	body .full-background:before{\n		-webkit-filter: blur({{blurSize}}px);\n		-moz-filter: blur({{blurSize}}px);\n		-ms-filter: blur({{blurSize}}px);\n		filter: blur({{blurSize}}px);\n	}\n	{{if bgType == 'image'}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left,\n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-image:url({{bgImage}});\n		}\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-size:100%;\n		}\n	{{else}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left, \n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background:{{endColor}};\n			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='{{startColor}}', endColorstr='{{endColor}}');\n			background-image: -webkit-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -moz-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -o-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -ms-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n		}\n	{{/if}}\n}\n");